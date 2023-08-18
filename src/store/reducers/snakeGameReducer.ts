import { SNAKE_MOVES, SPRITE_SIZES } from "../../common/constants";
import { Point2D } from "../../utils"
import { GAME_ACTION_TYPES } from "../actions";

export interface IGAME_STATE {
    snakePositions: Point2D[];
    currentDirection: string;
    score: number;
}

export const INITIAL_STATE: IGAME_STATE = {
    snakePositions: [
        { x: 300, y: 280 },
    ],
    currentDirection: SNAKE_MOVES.UP,
    score: 0
};

export default function snakeGameReducer(state = INITIAL_STATE, action: { type: string, payload?: any }): IGAME_STATE {
    switch (action.type) {
        case GAME_ACTION_TYPES.RIGHT:
        case GAME_ACTION_TYPES.LEFT:
        case GAME_ACTION_TYPES.UP:
        case GAME_ACTION_TYPES.DOWN:
            let newSnakePosition = [{
                x: state.snakePositions[0].x + ((action.payload || [])[0] as number),
                y: state.snakePositions[0].y + ((action.payload || [])[1] as number),
            }, ...state.snakePositions];
            newSnakePosition.pop();
            return {
                ...state,
                snakePositions: newSnakePosition,
            };
        case GAME_ACTION_TYPES.SET_CURRENT_DIRECTION:
            return { ...state, currentDirection: action.payload }
        case GAME_ACTION_TYPES.RESET:
            return { ...INITIAL_STATE }
        case GAME_ACTION_TYPES.INCREASE_SNAKE:
            return {
                ...state,
                snakePositions: [
                    ...state.snakePositions,
                    {
                        ...getXYPositionOfTail(state.currentDirection, state.snakePositions)
                    },
                ],
            };
        case GAME_ACTION_TYPES.RESET_SCORE:
            return { ...state, score: 0 };

        case GAME_ACTION_TYPES.INCREMENT_SCORE:
            return {
                ...state,
                score: state.score + action.payload,
            };
        default:
            return state
    }
}

const getXYPositionOfTail = (direction: string, snakePositions: Point2D[]) => {
    // case when there is only 1 node. take decision based on direction.
    if (snakePositions.length === 1) {
        switch (direction) {
            case SNAKE_MOVES.RIGHT:
                return { ...snakePositions[0], x: snakePositions[0].x - SPRITE_SIZES.SNAKE_BODY_SIZE }
            case SNAKE_MOVES.LEFT:
                return { ...snakePositions[0], x: snakePositions[0].x + SPRITE_SIZES.SNAKE_BODY_SIZE }
            case SNAKE_MOVES.UP:
                return { ...snakePositions[0], y: snakePositions[0].y + SPRITE_SIZES.SNAKE_BODY_SIZE }
            case SNAKE_MOVES.DOWN:
                return { ...snakePositions[0], y: snakePositions[0].y - SPRITE_SIZES.SNAKE_BODY_SIZE }
        }
    }
    const lastPoint = snakePositions[snakePositions.length - 1];
    const secondLastPoint = snakePositions[snakePositions.length - 2];
    if (lastPoint.x === secondLastPoint.x) { // Either Up or Down
        if (secondLastPoint.y > lastPoint.y) { // Down
            return {
                ...lastPoint,
                y: lastPoint.y - SPRITE_SIZES.SNAKE_BODY_SIZE
            }
        }  // Up
        return {
            ...lastPoint,
            y: lastPoint.y + SPRITE_SIZES.SNAKE_BODY_SIZE
        }

    }
    if (secondLastPoint.x > lastPoint.x) { // right
        return {
            ...lastPoint,
            x: lastPoint.x - SPRITE_SIZES.SNAKE_BODY_SIZE
        }
    }
    return {
        ...lastPoint,
        x: lastPoint.x + SPRITE_SIZES.SNAKE_BODY_SIZE
    }
}