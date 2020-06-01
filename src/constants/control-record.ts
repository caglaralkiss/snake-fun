import { Direction } from './direction';

/**
 * Maps {@link KeyboardEvent} 'keyCode' property to corresponding {@link Direction}
 */
export const CONTROL_RECORD: Record<number, Direction> = {
    37: Direction.LEFT,
    38: Direction.UP,
    39: Direction.RIGHT,
    40: Direction.DOWN
}
