import { Point, Snake } from '../interfaces';

export const POINT_DELIMITER = ',';

function serializePoint(point: Point): string {
    return `${point.X}${POINT_DELIMITER}${point.Y}`;
}

function parsePoint(pointStr: string): Point {
    const [X, Y] = pointStr
        .split(POINT_DELIMITER)
        .map(axisStr => Number(axisStr));

    return { X, Y };
}

function generateRandomInteger(upperBound: number): number {
    return Math.floor(Math.random() * upperBound);
}

/**
 * Calculate all points in a width*height array.
 *
 * @param width
 * @param height
 */
function getAllPoints(width: number, height: number): Array<string> {
    const points: Array<string> = [];

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            points.push(serializePoint({ X: i, Y: j }));
        }
    }

    return points;
}

/**
 * Constructs a {@link Snake} in given center point of board.
 *
 * @param boardCenter
 */
export function generateInitialSnake(boardCenter: Point): Snake {
    return {
        head: {
            X: boardCenter.X,
            Y: boardCenter.Y
        },
        body: [
            {
                X: boardCenter.X - 1,
                Y: boardCenter.Y
            }
        ],
        tail: {
            X: boardCenter.X - 2,
            Y: boardCenter.Y
        }
    }
}

/**
 * Generate a {@link Point} from empty points in width*height array.
 *
 * @param snake
 * @param width
 * @param height
 */
export function generateRandomFood(snake: Snake, width: number, height: number): Point {
    const { head, body, tail } = snake;

    const allPoints: Array<string> = getAllPoints(width, height);
    const filledPoints: Array<string> = [head, ...body, tail].map(point => serializePoint(point));
    const emptyPoints: Array<Point> = allPoints
        .filter(point => !filledPoints.includes(point))
        .map(pointStr => parsePoint(pointStr));

    const randomPointIndex = generateRandomInteger(emptyPoints.length);

    return emptyPoints[randomPointIndex];
}

/**
 * Check whether food can be eaten by {@link Snake}
 *
 * @param snake
 * @param food
 */
export function checkFoodEat(snake: Snake, food: Point): boolean {
    const { head: snakeHead } = snake;

    return snakeHead.X === food.X && snakeHead.Y === food.Y;
}

/**
 * Check whether {@link Snake} head is collided with body and tail parts.
 *
 * @param snake
 */
export function checkCollision(snake: Snake): boolean {
    const { head, body, tail } = snake;

    return [...body, tail]
        .map(point => serializePoint(point))
        .includes(serializePoint(head));
}
