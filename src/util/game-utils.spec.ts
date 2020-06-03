import { Point, Snake } from '../interfaces';
import { generateInitialSnake, generateRandomFood } from './game-utils';

describe('GameUtils', () => {
    const MOCK_CENTER_POINT: Point = {
        X: 14,
        Y: 14,
    }

    test('should create a snake from given center point', () => {
        const { head, body, tail } = generateInitialSnake(MOCK_CENTER_POINT);

        expect(head).toEqual({ X: MOCK_CENTER_POINT.X, Y: MOCK_CENTER_POINT.Y });
        expect(body[0]).toEqual({ X: MOCK_CENTER_POINT.X - 1, Y: MOCK_CENTER_POINT.Y });
        expect(tail).toEqual({ X: MOCK_CENTER_POINT.X - 2, Y: MOCK_CENTER_POINT.Y });
    });

    test('should generate a random food point', () => {
        const width = MOCK_CENTER_POINT.X * 2;
        const height = MOCK_CENTER_POINT.Y * 2;

        const snake: Snake = generateInitialSnake(MOCK_CENTER_POINT);
        const { head, body, tail } = snake;
        const food: Point = generateRandomFood(snake, width, height);

        expect(food.X).toBeLessThanOrEqual(width);
        expect(food.Y).toBeLessThanOrEqual(height);
        [head, ...body, tail].forEach(snakePoint => expect(snakePoint).not.toEqual(food));
    })
});
