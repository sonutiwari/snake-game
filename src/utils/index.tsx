import { SPRITE_SIZES } from "../common/constants";

export const clearBoard = (context: CanvasRenderingContext2D | null, width: number, height: number) => {
    if (context) {
        context.clearRect(0, 0, width, height);
    }
};

export interface Point2D {
    x: number;
    y: number;
}

export const drawGameSprites = (
    context: CanvasRenderingContext2D | null,
    spriteBody: Point2D[],
    fillColor: string,
    strokeStyle = "#ff5ff5"
) => {
    if (context) {
        spriteBody.forEach(({ x, y }: Point2D) => {
            context.fillStyle = fillColor;
            context.strokeStyle = strokeStyle;
            context?.fillRect(x, y, SPRITE_SIZES.SNAKE_BODY_SIZE, SPRITE_SIZES.SNAKE_BODY_SIZE);
            context?.strokeRect(x, y, SPRITE_SIZES.SNAKE_BODY_SIZE, SPRITE_SIZES.SNAKE_BODY_SIZE);
        });
    }
};

export const drawObject = (
    context: CanvasRenderingContext2D | null,
    objectBody: Point2D[],
    fillColor: string,
    strokeStyle = "#234534",
    isCircle?: boolean
) => {
    if (context) {
        objectBody.forEach((object: Point2D) => {
            context.fillStyle = fillColor;
            context.strokeStyle = strokeStyle;
            context?.fillRect(object.x, object.y, SPRITE_SIZES.SNAKE_BODY_SIZE, SPRITE_SIZES.SNAKE_BODY_SIZE);
            context?.strokeRect(object.x, object.y, SPRITE_SIZES.SNAKE_BODY_SIZE, SPRITE_SIZES.SNAKE_BODY_SIZE);
        });
    }
};

const getRandomIntegerBetweenMinMax = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

export const generateRandomPosition = (width: number, height: number) => {
    const x = getRandomIntegerBetweenMinMax(SPRITE_SIZES.RANDOM_POSITION_PADDING, width)
    const y = getRandomIntegerBetweenMinMax(SPRITE_SIZES.RANDOM_POSITION_PADDING, height)
    return ({
        x: Math.floor(x / SPRITE_SIZES.SNAKE_BODY_SIZE) * SPRITE_SIZES.SNAKE_BODY_SIZE,
        y: Math.floor(y / SPRITE_SIZES.SNAKE_BODY_SIZE) * SPRITE_SIZES.SNAKE_BODY_SIZE,
    });
}

export const hasSnakeCollided = (
    snakePositions: Point2D[],
    { x: currentX, y: currentY }: Point2D
) => snakePositions.some(({ x, y }: Point2D, index: number) => x === currentX && y === currentY && index !== 0);