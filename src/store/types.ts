import { Point, Snake } from '../interfaces';
import { Direction } from '../constants';
import { Observer } from 'rxjs';

export interface GameState {
    snake: Snake,
    food: Point,
    direction: Direction,
    isPlaying: boolean,
    currentScore: number,
    highestScore: number
}

export const CREATE_SNAKE = 'CREATE_SNAKE';
export const UPDATE_SNAKE = 'UPDATE_SNAKE';
export const GROW_SNAKE = 'GROW_SNAKE';
export const REMOVE_SNAKE = 'REMOVE_SNAKE';
export const CHANGE_DIRECTION = 'CHANGE_DIRECTION';
export const UPDATE_FOOD = 'UPDATE_FOOD';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_PLAY_STATE = 'UPDATE_PLAY_STATE';

interface CreateSnake {
    type: typeof CREATE_SNAKE,
    payload: Snake
}

interface UpdateSnake {
    type: typeof UPDATE_SNAKE
}

interface GrowSnake {
    type: typeof GROW_SNAKE
}

interface RemoveSnake {
    type: typeof REMOVE_SNAKE,
}

interface ChangeDirection {
    type: typeof CHANGE_DIRECTION,
    payload: Direction
}

interface UpdateFood {
    type: typeof UPDATE_FOOD,
    payload: Point
}

interface UpdateScore {
    type: typeof UPDATE_SCORE,
    payload: number,
}

interface UpdatePlayState {
    type: typeof UPDATE_PLAY_STATE,
    payload: boolean,
}

export type GameActionTypes =
    CreateSnake |
    UpdateSnake |
    GrowSnake |
    RemoveSnake |
    UpdateFood |
    ChangeDirection |
    UpdateScore |
    UpdatePlayState;

export interface Store<State, ActionTypes> {
    dispatch: (action: ActionTypes) => void,
    getState: () => State,
    subscribe: (observer: Observer<any>) => void
}
