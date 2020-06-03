import { Point, Snake } from '../interfaces';
import { checkCollision, checkFoodEat, generateInitialSnake, generateRandomFood } from './game-utils';

describe('GameUtils', () => {
    const MOCK_CENTER_POINT: Point = {
        X: 14,
        Y: 14,
    }

    const COLLAPSED_SNAKE: Snake = {
        head: { X: 1, Y: 0 },
        body: [
            { X: 1, Y: 0 },
            { X: 2, Y: 0 },
            { X: 2, Y: 1 },
            { X: 1, Y: 1 }
        ],
        tail: { X: 0, Y: 0 },
    };

    const NON_COLLAPSED_SNAKE: Snake = {
        head: { X: 0, Y: 0 },
        body: [],
        tail: { X: 1, Y: 0 }
    };

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
    });

    test('should check whether snake eat food', () => {
        const snake: Snake = generateInitialSnake(MOCK_CENTER_POINT);
        const foodAtHead: Point = snake.head;
        const foodAtNotHead: Point = { ...snake.head, X: snake.head.X + 1 };

        expect(checkFoodEat(snake, foodAtHead)).toBeTruthy();
        expect(checkFoodEat(snake, foodAtNotHead)).toBeFalsy();
    });

    test('should check collision of snake head', () => {
       expect(checkCollision(COLLAPSED_SNAKE)).toBeTruthy();
       expect(checkCollision(NON_COLLAPSED_SNAKE)).toBeFalsy();
    });
});
