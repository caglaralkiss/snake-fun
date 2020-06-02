import { SnakeEngine, SnakeEngineOptions } from './snake-engine';
import { Color } from '../constants';
import { render } from '../util/test-utils';

describe('SnakeEngine', () => {

    const MOCK_TEMPLATE = `<div class="board_wrapper"><canvas id="board"></canvas></div>`

    const MOCK_SNAKE_ENGINE_OPTS: SnakeEngineOptions = {
        canvas: {
            width: 10,
            height: 10,
            color: Color.BLACK,
        },
        snake: {
            width: 1,
            height: 1,
            color: Color.WHITE,
        },
        food: {
            color: Color.GREEN,
        }
    }

   it('should create snake board with given context&options', () => {
       const canvasId = 'board';
       const doc = render(MOCK_TEMPLATE);
       const canvasElement = doc.querySelector(`#${canvasId}`) as HTMLCanvasElement;
       const snakeEngine = new SnakeEngine(canvasElement, MOCK_SNAKE_ENGINE_OPTS);

       expect(canvasElement.height).toEqual(MOCK_SNAKE_ENGINE_OPTS.canvas.height);
       expect(canvasElement.width).toEqual(MOCK_SNAKE_ENGINE_OPTS.canvas.width);
       expect(snakeEngine.options.snake).toEqual(MOCK_SNAKE_ENGINE_OPTS.snake);
   });
});
