import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from 'entities/Counter';

// для переиспользования для storybook jest
export function createReduxStore(initialState?: StateSchema) {
    // принимает три generic'a для store, action, middleware
    return configureStore<StateSchema>({
        reducer: {
            counter: counterReducer,
        },
        // отключим devTools для продакшена
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
