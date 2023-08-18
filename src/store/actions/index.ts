import { GameLevels } from "../../common/constants";

export const GAME_ACTION_TYPES = {
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    UP: "UP",
    DOWN: "DOWN",
    SET_CURRENT_DIRECTION: "SET_CURRENT_DIRECTION",
    RESET: "RESET",
    STOP_GAME: "STOP_GAME",
    INCREASE_SNAKE: "INCREASE_SNAKE",
    INCREMENT_SCORE: "INCREMENT_SCORE",
    RESET_SCORE: "RESET_SCORE"
}

export const SCORE = {
    [GameLevels.EASY]: 1,
    [GameLevels.MEDIUM]: 4,
    [GameLevels.HARD]: 9,
    [GameLevels.SUPERMAN]: 16
}

export const makeMoveAction = (deltaX: number, deltaY: number, actionType: string) => ({
    type: actionType,
    payload: [deltaX, deltaY]
});

export const setCurrentDirection = (direction: string) => {
    return ({
        type: GAME_ACTION_TYPES.SET_CURRENT_DIRECTION,
        payload: direction
    });
}

export const resetGameAction = () => ({
    type: GAME_ACTION_TYPES.RESET
});

export const stopGameAction = () => ({
    type: GAME_ACTION_TYPES.STOP_GAME
});

export const increaseSnakeAction = () => ({
    type: GAME_ACTION_TYPES.INCREASE_SNAKE
});

export const scoreUpdatesAction = (type: string, gameLevel?: string) => ({
    type,
    payload: gameLevel ? SCORE[gameLevel]: 0
});