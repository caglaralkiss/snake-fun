import { Point, Snake } from '../interfaces';
import {
    GameActionTypes,
    CHANGE_DIRECTION,
    CREATE_SNAKE,
    GROW_SNAKE,
    REMOVE_SNAKE,
    UPDATE_FOOD,
    UPDATE_PLAY_STATE,
    UPDATE_SCORE,
    UPDATE_SNAKE
} from './types';
import { Direction } from '../constants';

export function createSnake(snake: Snake): GameActionTypes {
    return {
        type: CREATE_SNAKE,
        payload: snake,
    }
}

export function updateSnake(): GameActionTypes {
    return {
        type: UPDATE_SNAKE
    }
}

export function growSnake(): GameActionTypes {
    return {
        type: GROW_SNAKE
    }
}

export function removeSnake(): GameActionTypes {
    return {
        type: REMOVE_SNAKE
    }
}

export function changeDirection(direction: Direction): GameActionTypes {
    return {
        type: CHANGE_DIRECTION,
        payload: direction
    }
}

export function updateFood(foodPosition: Point): GameActionTypes {
    return {
        type: UPDATE_FOOD,
        payload: foodPosition,
    }
}

export function updateScore(score: number): GameActionTypes {
    return {
        type: UPDATE_SCORE,
        payload: score,
    }
}

export function updatePlayState(isPlaying: boolean): GameActionTypes {
    return {
        type: UPDATE_PLAY_STATE,
        payload: isPlaying
    }
}
