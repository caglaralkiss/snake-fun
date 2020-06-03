import { Direction } from '../constants';
import {
    changeDirection,
    createSnake,
    growSnake,
    removeSnake,
    updateFood,
    updatePlayState,
    updateScore,
    updateSnake
} from './actions';
import {
    CHANGE_DIRECTION,
    CREATE_SNAKE,
    GROW_SNAKE,
    REMOVE_SNAKE,
    UPDATE_FOOD,
    UPDATE_PLAY_STATE, UPDATE_SCORE,
    UPDATE_SNAKE
} from './types';

describe('Actions', () => {
    const MOCK_PAYLOADS = {
        snake: {
            head: {
                X: 3,
                Y: 3,
            },
            body: [{
                X: 2,
                Y: 3
            }],
            tail: {
                X: 1,
                Y: 3
            }
        },
        direction: Direction.UP,
        food: {
            X: 5,
            Y: 5
        },
        score: 30,
        playState: true

    };

    test('should create snake actions', () => {
        const { snake, food, direction, score, playState } = MOCK_PAYLOADS;

        expect(createSnake(snake)).toEqual({ type: CREATE_SNAKE, payload: snake });
        expect(updateSnake()).toEqual({ type: UPDATE_SNAKE });
        expect(growSnake()).toEqual({ type: GROW_SNAKE });
        expect(removeSnake()).toEqual({ type: REMOVE_SNAKE })
        expect(changeDirection(direction)).toEqual({ type: CHANGE_DIRECTION, payload: direction });
        expect(updateFood(food)).toEqual({ type: UPDATE_FOOD, payload: food });
        expect(updateScore(score)).toEqual({ type: UPDATE_SCORE, payload: score });
        expect(updatePlayState(playState)).toEqual({ type: UPDATE_PLAY_STATE, payload: playState });
    })
})
