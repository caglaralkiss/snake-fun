import { SnakeEngine } from './canvas/snake-engine';
import { BOARD_CENTER, Color, CONTROL_RECORD, Direction, HEIGHT, SNAKE_HEIGHT, SNAKE_WIDTH, WIDTH } from './constants';
import {
    changeDirection,
    createSnake,
    createStore,
    GameActionTypes,
    gameReducer,
    GameState,
    growSnake,
    removeSnake,
    updateFood,
    updatePlayState,
    updateScore,
    updateSnake
} from './store';
import { fromEvent, interval, of } from 'rxjs';
import { distinctUntilChanged, filter, map, share, switchMap } from 'rxjs/operators';
import { checkCollision, checkFoodEat, generateInitialSnake, generateRandomFood } from './util/game-utils';
import { Point, Snake } from './interfaces';

const REFS = {
    currentScoreText: document.querySelector('.score-board__current') as HTMLElement,
    highestScoreText: document.querySelector('.score-board__highest') as HTMLElement,
    gameButton: document.querySelector('#game-button') as HTMLButtonElement,
}

const BOARD_WIDTH = WIDTH / SNAKE_WIDTH - 1;
const BOARD_HEIGHT = HEIGHT / SNAKE_HEIGHT - 1;

const Store = createStore<GameState, GameActionTypes>(gameReducer);
const snakeEngine = new SnakeEngine(document.querySelector('#board'), {
    canvas: {
        width: WIDTH,
        height: HEIGHT,
        color: Color.BLACK,
    },
    snake: {
        width: SNAKE_WIDTH,
        height: SNAKE_HEIGHT,
        color: Color.WHITE
    },
    food: {
        color: Color.GREEN
    }
});

const keyboard$ = fromEvent(document, 'keydown').pipe(
    map((event: KeyboardEvent) => event.which || event.keyCode || event.key),
    filter(code => Object.keys(CONTROL_RECORD).includes(code + '')),
    map(keyCode => CONTROL_RECORD[Number(keyCode)]),
    distinctUntilChanged((a: Direction, b: Direction) => a !== b && !Store.getState().isPlaying),
    share()
);

const playState$ = fromEvent(document.getElementById('game-button'), 'click').pipe(
    switchMap(() => {
        const newPlayState = !Store.getState().isPlaying;

        return of<boolean>(newPlayState);
    })
)

const game$ = interval(100).pipe(
    switchMap(() => of(Store.getState().isPlaying)),
    filter(playState => playState)
)

keyboard$.subscribe(direction => Store.dispatch(changeDirection(direction)))

playState$.subscribe((playState: boolean) => {
    Store.dispatch(updatePlayState(playState));
    Store.dispatch(removeSnake());
    Store.dispatch(updateFood(null));
    Store.dispatch(updateScore(0));

    if (playState) {
        const snake: Snake = generateInitialSnake(BOARD_CENTER);
        Store.dispatch(createSnake(snake));
        Store.dispatch(updateFood(generateRandomFood(snake, BOARD_WIDTH, BOARD_HEIGHT)));
    }
});

game$.subscribe(() => {
    const { snake, food, currentScore } = Store.getState()

    snakeEngine.drawBoard();
    snakeEngine.drawSnake(snake);
    snakeEngine.drawFood(food);

    if(checkFoodEat(snake, food)) {
        const newFoodLocation: Point = generateRandomFood(snake, BOARD_WIDTH, BOARD_HEIGHT);
        Store.dispatch(updateFood(newFoodLocation));
        Store.dispatch(growSnake());
        Store.dispatch(updateScore(currentScore + 10));
    }

    if (checkCollision(snake)) {
        Store.dispatch(updatePlayState(false));
        Store.dispatch(removeSnake());
        Store.dispatch(updateFood(null));
        Store.dispatch(updateScore(0));
        snakeEngine.drawBoard();
        return;
    }

    Store.dispatch(updateSnake());
});

Store.subscribe(
    {
        next: (state: GameState) => {
            REFS.currentScoreText.innerText = `${ state.currentScore }`;
            REFS.highestScoreText.innerText = `${ state.highestScore }`;
            REFS.gameButton.innerText = !state.isPlaying ? 'Start Game' : 'Quit Game';
        },
        error: () => {
            /* on error */
        },
        complete(): void {
            /* on complete */
        }
    }
)
