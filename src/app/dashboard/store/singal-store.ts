import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

export const CounterStore = signalStore(
    { providedIn: 'root' },
    withState({count: 0}),
    withMethods(({count, ...store}) => ({
        increment() {
            patchState(store, {count: count() + 1})
        },
        decrement() {
            patchState(store, {count: count() - 1})
        },
        reset() {
            patchState(store, {count: 0})
        }
    }))
)