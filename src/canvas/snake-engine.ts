import { Color } from '../constants';
import { Point, Snake } from '../interfaces';

interface BaseOptions {
    width: number,
    height: number,
    color: Color
}

/**
 * Configuration type for {@link SnakeEngine} class.
 */
export interface SnakeEngineOptions {
    canvas: BaseOptions
    snake: BaseOptions,
    food: { color: Color }
}

/**
 * Small physics engine for any canvas element to draw game objects.
 */
export class SnakeEngine {

    get options(): SnakeEngineOptions {
        return this._options;
    }
    private readonly _options: SnakeEngineOptions;

    get context(): CanvasRenderingContext2D {
        return this._context;
    }
    private readonly _context: CanvasRenderingContext2D;

    constructor(canvasElement: HTMLCanvasElement, options: SnakeEngineOptions) {
        this.initCanvas(canvasElement, options);
        this._options = options;
        this._context = this.getRenderingContext(canvasElement);
    }

    /**
     * Draw a game board to the context with options.
     */
    drawBoard(): void {
        const { height, width, color } = this._options.canvas;

        this._context.fillStyle = color;
        this._context.fillRect(0, 0, height, width);
        this._context.stroke();
    }

    /**
     * Draw snake to the context with given options.
     *
     * @param snake Snake object to be drawn.
     */
    drawSnake(snake: Snake): void {
        const { height, width, color } = this._options.snake;
        const { head, body, tail } = snake;

        [head, ...body, tail].forEach(point => this.drawRect(point, color, width, height));
    }

    /**
     * Draw food to the context with specified color.
     *
     * @param point Food position on canvas plane.
     */
    drawFood(point: Point): void {
        const { width, height } = this._options.snake;
        const { color } = this._options.food;

        this.drawRect(point, color, width, height);
    }

    /**
     * Draw a rectangle in given point.
     *
     * @param point
     * @param color
     * @param width
     * @param height
     */
    private drawRect(point: Point, color: Color, width: number, height: number): void {
        this._context.fillStyle = color;
        this._context.fillRect(point.X * width, point.Y * height, width, height);
        this._context.stroke();
    }

    /**
     * Sets canvas width and height.
     *
     * @param canvasElement
     * @param options
     */
    private initCanvas(canvasElement: HTMLCanvasElement, options: SnakeEngineOptions) {
        const { width, height } = options.canvas;

        canvasElement.width = width;
        canvasElement.height = height;
    }

    /**
     * Provides 2D rendering context for given element.
     *
     * @param element
     */
    private getRenderingContext(element: HTMLCanvasElement): CanvasRenderingContext2D {
        return element.getContext('2d');
    }
}
