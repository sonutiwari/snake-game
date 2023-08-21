import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import snakeGameReducer, { INITIAL_STATE } from "../../store/reducers/snakeGameReducer";
import { Point2D, clearBoard, drawObject, generateRandomPosition, hasSnakeCollided } from "../../utils";
import { GAME_ACTION_TYPES, increaseSnakeAction, makeMoveAction, resetGameAction, scoreUpdatesAction, setCurrentDirection, stopGameAction } from "../../store/actions";
import HowToPlay from "../howToPlay";
import ScoreBoard from "../scoreBoard";
import { COLORS, GAME_SPEED_INTERVAL_IN_MILLISECONDS, KEY_DOWN_EVENT, KEY_NAME_VALUE_MAP, SNAKE_MOVES, SPRITE_SIZES } from "../../common/constants";

export interface IGameBoard {
    height: number;
    width: number;
    gameLevel: string;
    setShowGameOverCard: (showGameOverCard: boolean) => void;
}
const GameBoard = ({ height, width, gameLevel, setShowGameOverCard }: IGameBoard) => {
    const [state, dispatch] = useReducer(snakeGameReducer, INITIAL_STATE);
    const { snakePositions, score, currentDirection } = state;
    const [gameEnded, setGameEnded] = useState<boolean>(false);
    const [foodPosition, setFoodPosition] = useState<Point2D>(
        generateRandomPosition(width - SPRITE_SIZES.SNAKE_BODY_SIZE, height - SPRITE_SIZES.SNAKE_BODY_SIZE)
    );
    const [isConsumed, setIsConsumed] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const moveSnake = useCallback(
        (deltaX = 0, deltaY = 0) => {
            if (deltaX > 0 && deltaY === 0) {
                dispatch(makeMoveAction(deltaX, deltaY, GAME_ACTION_TYPES.RIGHT));
            }

            if (deltaX < 0 && deltaY === 0) {
                dispatch(makeMoveAction(deltaX, deltaY, GAME_ACTION_TYPES.LEFT));
            }

            if (deltaX === 0 && deltaY < 0) {
                dispatch(makeMoveAction(deltaX, deltaY, GAME_ACTION_TYPES.UP));
            }

            if (deltaX === 0 && deltaY > 0) {
                dispatch(makeMoveAction(deltaX, deltaY, GAME_ACTION_TYPES.DOWN));
            }
        },
        [dispatch]
    );

    const handleKeyEvents = useCallback(
        (event: KeyboardEvent) => {
            event.preventDefault();
            event.stopPropagation();
            let newDirection = currentDirection;
            let deltaX = 0;
            let deltaY = 0
            switch (event.key) {
                case KEY_NAME_VALUE_MAP.UP_ARROW_KEY:
                    if (newDirection !== SNAKE_MOVES.DOWN) {
                        newDirection = SNAKE_MOVES.UP;
                        deltaY = -SPRITE_SIZES.SNAKE_BODY_SIZE;
                    }
                    break;
                case KEY_NAME_VALUE_MAP.DOWN_ARROW_KEY:
                    if (currentDirection !== SNAKE_MOVES.UP) {
                        newDirection = SNAKE_MOVES.DOWN;
                        deltaY = SPRITE_SIZES.SNAKE_BODY_SIZE;
                    }
                    break;
                case KEY_NAME_VALUE_MAP.LEFT_ARROW_KEY:
                    if (currentDirection !== SNAKE_MOVES.RIGHT) {
                        newDirection = SNAKE_MOVES.LEFT;
                        deltaX = -SPRITE_SIZES.SNAKE_BODY_SIZE;
                    }
                    break;
                case KEY_NAME_VALUE_MAP.RIGHT_ARROW_KEY:
                    if (currentDirection !== SNAKE_MOVES.LEFT) {
                        newDirection = SNAKE_MOVES.RIGHT;
                        deltaX = SPRITE_SIZES.SNAKE_BODY_SIZE;
                    }
            }
            if (newDirection !== currentDirection) {
                dispatch(setCurrentDirection(newDirection))
                intervalRef.current && clearInterval(intervalRef.current);
                intervalRef.current = setInterval(() => {
                    moveSnake(deltaX, deltaY)
                }, GAME_SPEED_INTERVAL_IN_MILLISECONDS[gameLevel as unknown as string]);
            }
        },
        [currentDirection, moveSnake, gameLevel]
    );

    const resetBoard = useCallback(() => {
        window.removeEventListener(KEY_DOWN_EVENT, handleKeyEvents);
        dispatch(resetGameAction());
        dispatch(scoreUpdatesAction(GAME_ACTION_TYPES.RESET_SCORE));
        clearBoard(context, width, height);
        drawObject(context, snakePositions, COLORS.SNAKE_COLOR);
        drawObject(
            context,
            [generateRandomPosition(width - SPRITE_SIZES.SNAKE_BODY_SIZE, height - SPRITE_SIZES.SNAKE_BODY_SIZE)],
            COLORS.FOOD_COLOR
        );
        window.addEventListener(KEY_DOWN_EVENT, handleKeyEvents);
    }, [context, dispatch, handleKeyEvents, height, snakePositions, width]);

    useEffect(() => {
        if (isConsumed) {
            const position = generateRandomPosition(width - SPRITE_SIZES.RANDOM_POSITION_PADDING, height - SPRITE_SIZES.RANDOM_POSITION_PADDING);
            setFoodPosition(position);
            setIsConsumed(false);
            dispatch(increaseSnakeAction());
            dispatch(scoreUpdatesAction(GAME_ACTION_TYPES.INCREMENT_SCORE, gameLevel));
        }
    }, [isConsumed, foodPosition, height, width, dispatch, gameLevel]);

    useEffect(() => {
        //Draw on canvas each time
        setContext(canvasRef.current && canvasRef.current.getContext("2d"));
        clearBoard(context, width, height);
        drawObject(context, snakePositions, COLORS.SNAKE_COLOR);
        drawObject(context, [foodPosition], COLORS.FOOD_COLOR);

        //When the object is consumed
        if (Math.abs(snakePositions[0].x - foodPosition?.x) <= SPRITE_SIZES.SNAKE_BODY_SIZE/2  && Math.abs(snakePositions[0].y - foodPosition?.y) <= SPRITE_SIZES.SNAKE_BODY_SIZE/2) {
            setIsConsumed(true);
        }

        if (
            hasSnakeCollided(snakePositions, snakePositions[0]) ||
            snakePositions[0].x >= width ||
            snakePositions[0].x <= 0 ||
            snakePositions[0].y <= 0 ||
            snakePositions[0].y >= height
        ) {
            setGameEnded(true);
            setShowGameOverCard(true);
            dispatch(stopGameAction());
            intervalRef.current && clearInterval(intervalRef.current)
            window.removeEventListener(KEY_DOWN_EVENT, handleKeyEvents);
        } else setGameEnded(false);
    }, [context, foodPosition, snakePositions, height, width, dispatch, handleKeyEvents, setShowGameOverCard]);

    useEffect(() => {
        window.addEventListener(KEY_DOWN_EVENT, handleKeyEvents);

        return () => {
            window.removeEventListener(KEY_DOWN_EVENT, handleKeyEvents);
        };
    }, [handleKeyEvents]);

    return (
        <>
            <ScoreBoard score={score} />
            <canvas
                ref={canvasRef}
                style={{
                    border: `3px solid ${gameEnded ? "red" : "black"}`,
                }}
                width={width}
                height={height}
            />
            <HowToPlay resetBoard={resetBoard} />
        </>
    );
};

export default GameBoard;