import { Store } from './types';
import { BehaviorSubject, Observer, Subscription } from 'rxjs';

/* Symbol for initial dispatch */
const $$initDispatch = Symbol('INIT_DISPATCH');

/**
 * Generate a store with a given state.
 *
 * @param rootReducer
 * @param state
 */
export function createStore<S, A>(rootReducer: (s: S, a: A) => S, state?: S): Store<S, A> {
    const state$: BehaviorSubject<S> = new BehaviorSubject<S>(state);

    const store: Store<S, A> = {
        dispatch: (action: A): void => {
            const nextState = rootReducer(state$.value, action);
            state$.next(nextState);
        },
        getState: (): S => state$.value,
        subscribe: (observer: Observer<any>): Subscription => state$.subscribe(observer)
    }

    // Dispatch an empty action to restore state when state is not provided.
    store.dispatch({ type: $$initDispatch } as unknown as A);

    return store;
}
