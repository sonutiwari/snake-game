export const SNAKE_MOVES = {
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    UP: "UP",
    DOWN: "DOWN",
}

export const KEY_NAME_VALUE_MAP = {
    RIGHT_ARROW_KEY: "ArrowRight",
    LEFT_ARROW_KEY: "ArrowLeft",
    UP_ARROW_KEY: "ArrowUp",
    DOWN_ARROW_KEY: "ArrowDown"
}

export const KEY_DOWN_EVENT = "keydown";

export const SPRITE_SIZES = {
    SNAKE_BODY_SIZE: 10,
    RANDOM_POSITION_PADDING: 15,
}

export const GameLevels = {
    EASY: 'EASY',
    MEDIUM: 'MEDIUM',
    HARD: 'HARD',
    SUPERMAN: 'SUPERMAN',
}

export const GAME_SPEED_INTERVAL_IN_MILLISECONDS: Record<string, number> = {
    EASY: 350,
    MEDIUM: 250,
    HARD: 150,
    SUPERMAN: 50
}