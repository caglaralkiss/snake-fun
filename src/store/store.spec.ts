import { Store } from './types';
import { createStore } from './store';

describe('Store', () => {

    /* Mock Types */
    const MOCK_ACTION = 'MOCK_ACTION';

    interface MockAction {
        type: typeof MOCK_ACTION,
        payload: boolean
    }

    function mockAction(payload: boolean): MockAction {
        return {
            type: MOCK_ACTION,
            payload
        }
    }

    interface MockState {
        mockProp: boolean
    }

    function mockReducer(state: MockState = MOCK_INITIAL_STATE, action: MockAction): MockState {
        return action.type === MOCK_ACTION ? { ...state, mockProp: action.payload } : state;
    }

    const MOCK_INITIAL_STATE: MockState = {
        mockProp: true
    }

    /* Test Store */
    let mockStore: Store<MockState, MockAction>

    beforeEach(() => {
        mockStore = null;
    })

    test('should create a store with provided state', () => {
        const state: MockState = {
            mockProp: !MOCK_INITIAL_STATE.mockProp,
        }

        mockStore = createStore(mockReducer, state);

        expect(mockStore.getState()).toEqual(state);
    })

    test('should create a store with initial state when state is not provided', () => {
        mockStore = createStore(mockReducer);

        expect(mockStore.getState()).toEqual(MOCK_INITIAL_STATE);
    })

    test('should dispatch predefined actions', () => {
        const payload = false;

        mockStore = createStore(mockReducer);
        mockStore.dispatch(mockAction(payload));

        expect(mockStore.getState().mockProp).toBe(payload)
    })

    test('should subscribe to Store with subscribe method', () => {
        mockStore = createStore(mockReducer);
        const payload = true;

        mockStore.dispatch(mockAction(payload));

        mockStore.subscribe({
            next: value => expect(value.mockProp).toBe(payload),
            error(err: Error): void {
                expect(err).toBeInstanceOf(Error)
            },
            complete(): void {
                // Complete observe
            }
        })
    });
})
