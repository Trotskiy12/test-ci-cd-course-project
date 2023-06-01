import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';

// для переиспользования для storybook jest
export function createReduxStore(initialState?: StateSchema) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
        loginForm: loginReducer,
    };

    // принимает три generic'a для store, action, middleware
    return configureStore<StateSchema>({
        reducer: rootReducer,
        // отключим devTools для продакшена
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
