import {
    GameActionTypes,
    CHANGE_DIRECTION,
    CREATE_SNAKE,
    GROW_SNAKE,
    REMOVE_SNAKE,
    GameState,
    UPDATE_FOOD,
    UPDATE_PLAY_STATE,
    UPDATE_SCORE,
    UPDATE_SNAKE
} from './types';
import { Direction, HEIGHT, SNAKE_HEIGHT, SNAKE_WIDTH, WIDTH } from '../constants';
import { Point, Snake } from '../interfaces';

/** Initial {@link GameState} **/
const initialState: GameState = {
    snake: null,
    food: null,
    currentScore: 0,
    highestScore: 0,
    isPlaying: false,
    direction: Direction.RIGHT
}

/**
 * Calculate the head of the {@link Snake} for next update by {@link Direction}.
 *
 * @param snakeHead Current head point of the Snake.
 * @param direction Direction for the new head position of Snake.
 */
const getNewSnakeHeadByDirection = (snakeHead: Point, direction: Direction) => {
    switch (direction) {
        case Direction.UP:
            return { ...snakeHead, Y: snakeHead.Y <= 0 ? HEIGHT / SNAKE_HEIGHT - 1 : snakeHead.Y - 1 }
        case Direction.DOWN:
            return { ...snakeHead, Y: snakeHead.Y >= HEIGHT / SNAKE_HEIGHT - 1 ? 0 : snakeHead.Y + 1 }
        case Direction.LEFT:
            return { ...snakeHead, X: snakeHead.X <= 0 ? WIDTH / SNAKE_WIDTH - 1 : snakeHead.X - 1 }
        case Direction.RIGHT:
            return { ...snakeHead, X: snakeHead.X >= WIDTH / SNAKE_WIDTH - 1 ? 0 : snakeHead.X + 1 }
        default:
            throw new Error('Direction is not specified!');
    }
}

/**
 * Get current state of the {@link Snake} and calculate the position by {@link Direction}
 *
 * @param snake
 * @param direction
 */
const move = (snake: Snake, direction: Direction) => {
    const { head, body } = snake;
    const newHead = getNewSnakeHeadByDirection(head, direction);

    return {
        head: newHead,
        body: [head, ...body.slice(0, body.length - 1)],
        tail: body.slice(-1)[0]
    }
}

/**
 * Enlarge {@link Snake} by adding new {@link Point} to the snake's body.
 *
 * @param snake
 * @param currDirection
 */
const growSnake = (snake: Snake, currDirection: Direction) => {
    const { body, tail } = snake;

    switch (currDirection) {
        case Direction.UP:
            return {
                ...snake,
                body: [...body, tail],
                tail: { X: tail.X, Y: tail.Y + 1 }
            };
        case Direction.DOWN:
            return {
                ...snake,
                body: [tail, ...body],
                tail: { X: tail.X, Y: tail.Y - 1 }
            };
        case Direction.LEFT:
            return {
                ...snake,
                body: [...body, tail],
                tail: { X: tail.X + 1, Y: tail.Y }
            };
        case Direction.RIGHT:
            return {
                ...snake,
                body: [tail, ...body],
                tail: { X: tail.X - 1, Y: tail.Y }
            };
        default:
            throw new Error('Undefined direction');
    }
}

/**
 * Record of the valid next {@link Direction} of each one.
 */
const POSSIBLE_TURN_DIRECTIONS: Record<Direction, Array<Direction>> = {
    [Direction.UP]: [Direction.LEFT, Direction.RIGHT],
    [Direction.DOWN]: [Direction.LEFT, Direction.RIGHT],
    [Direction.LEFT]: [Direction.DOWN, Direction.UP],
    [Direction.RIGHT]: [Direction.DOWN, Direction.UP]
}

/**
 * Reducer function for the {@link Store} to determine next {@link GameState}.
 *
 * @param state Current state. If it is absent, initial state will be used.
 * @param action Snake action.
 */
export function gameReducer(
    state: GameState = initialState,
    action: GameActionTypes
): GameState {
    const { direction: currDirection, snake } = state;

    switch (action.type) {
        case CREATE_SNAKE:
            return { ...state, snake: action.payload };
        case GROW_SNAKE:
            const growthSnake = growSnake(snake, currDirection);
            return { ...state, snake: growthSnake };
        case UPDATE_SNAKE:
            const newSnakeState = move(snake, currDirection);

            return { ...state, snake: newSnakeState ? newSnakeState : null };
        case REMOVE_SNAKE:
            return { ...state, snake: null };
        case CHANGE_DIRECTION:
            const isDirectionValid = POSSIBLE_TURN_DIRECTIONS[currDirection].includes(action.payload);

            return isDirectionValid ? { ...state, direction: action.payload } : state;
        case UPDATE_FOOD:
            return { ...state, food: action.payload ? action.payload : null }
        case UPDATE_SCORE:
            const newScore = action.payload;
            const { highestScore } = state;

            return {
                ...state,
                currentScore: newScore,
                highestScore: newScore > highestScore ? newScore : highestScore
            }
        case UPDATE_PLAY_STATE:
            return { ...state, isPlaying: action.payload };
        default:
            return state;
    }
}
