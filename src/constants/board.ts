import { Point } from '../interfaces';

/**
 * Global constants of project.
 */
export const WIDTH = 300;
export const HEIGHT = 300;
export const SNAKE_WIDTH = 10;
export const SNAKE_HEIGHT = 10;
export const boardCenter: Point = {
    X: Math.floor((WIDTH / SNAKE_WIDTH) / 2),
    Y: Math.floor((HEIGHT / SNAKE_HEIGHT) / 2)
};
