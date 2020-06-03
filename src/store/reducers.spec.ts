import { GameActionTypes, GameState } from './types';
import { Direction } from '../constants';
import { gameReducer } from './reducers';
import { Snake } from '../interfaces';
import {
    changeDirection,
    createSnake,
    growSnake,
    removeSnake,
    updateFood,
    updatePlayState,
    updateScore
} from './actions';

describe('Reducer', () => {
    const MOCK_STATE: GameState = {
        snake: null,
        food: null,
        direction: null,
        isPlaying: null,
        currentScore: null,
        highestScore: null,
    };

    test('should create snake', () => {
        const snake: Snake = { head: null, body: null, tail: null };

        const newState: GameState = {
            ...MOCK_STATE,
            snake,
        }

        expect(gameReducer(MOCK_STATE, createSnake(snake))).toEqual(newState);
    });

    test('should grow snake', () => {
        const gameState: GameState = {
            ...MOCK_STATE,
            snake: { head: { X: 10, Y: 10 }, body: [{ X: 10, Y: 9 }], tail: { X: 10, Y: 8 } },
            direction: Direction.UP
        };

        const { length: snakeBodyLengthBeforeGrow } = gameState.snake.body;
        const { length: snakeBodyLengthAfterGrow } = gameReducer(gameState, growSnake()).snake.body;

        expect(snakeBodyLengthAfterGrow).toEqual(snakeBodyLengthBeforeGrow + 1);
    });

    test('should remove snake', () => {
        const gameState: GameState = {
            ...MOCK_STATE,
            snake: { head: null, body: null, tail: null },
        };
        const newState: GameState = { ...MOCK_STATE, snake: null };

        expect(gameReducer(gameState, removeSnake())).toEqual(newState)
    });

    test('should update food position', () => {
        const gameState: GameState = { ...MOCK_STATE, food: { X: 3, Y: 4 } };

        const newFoodLocation = { X: 10, Y: 10 };
        const newState: GameState = { ...MOCK_STATE, food: newFoodLocation };

        expect(gameReducer(gameState, updateFood(newFoodLocation))).toEqual(newState);
    });

    test('should change direction', () => {
       const gameState: GameState = { ...MOCK_STATE, direction: Direction.UP };

       const newDirection: Direction = Direction.RIGHT;
       const newState: GameState = { ...MOCK_STATE, direction: newDirection };

       expect(gameReducer(gameState, changeDirection(newDirection))).toEqual(newState);
    });

    test('should update current score', () => {
        const baseScoreUpdate = 10;
        const currentScore = 20;
        const highestScore = currentScore + 2 * baseScoreUpdate;
        const gameState: GameState = { ...MOCK_STATE, currentScore, highestScore };

        const newScore = gameState.currentScore + baseScoreUpdate;
        const newState: GameState = { ...gameState, currentScore: newScore };

        expect(gameReducer(gameState, updateScore(newScore))).toEqual(newState);
    });

    test('should update highest score if new score is higher than it', () => {
        const gameState: GameState = { ...MOCK_STATE, currentScore: 0, highestScore: 30 };

        const newScore = gameState.highestScore + 10;
        const newState: GameState = { ...MOCK_STATE, currentScore: newScore, highestScore: newScore };

        expect(gameReducer(gameState, updateScore(newScore))).toEqual(newState);

    });

    test('should update play state', () => {
        const gameState: GameState = { ...MOCK_STATE, isPlaying: true };

        const newPlayState = false;
        const newState: GameState = { ...MOCK_STATE, isPlaying: newPlayState };

        expect(gameReducer(gameState, updatePlayState(newPlayState))).toEqual(newState);
    });

    test('should return same state when action type is not a game action', () => {
        const newState = gameReducer(MOCK_STATE, { type: 'NOT_A_PREDEFINED_ACTION' } as unknown as GameActionTypes);

        expect(newState).toEqual(MOCK_STATE);
    });
})
