import { Point } from './point';

/**
 * Snake is constructed from three segments: head, body and tail.
 *
 * 'head' and 'tail' are single point but 'body' can include multiple consecutive points.
 */
export interface Snake {
    head: Point,
    body: Array<Point>
    tail: Point,
}
