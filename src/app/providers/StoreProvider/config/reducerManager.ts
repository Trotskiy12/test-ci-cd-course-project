import {
    AnyAction, Reducer, ReducersMapObject, combineReducers,
} from '@reduxjs/toolkit';
import { StateSchema, StateSchemaKey } from './StateSchema';

// Функция принимает дефолтные редуюсеры
export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>) {
    const reducers = { ...initialReducers };
    // создаем корневой редьюсер
    let combinedReducer = combineReducers(reducers);
    // названия редусеров, которые мы хотим удалить
    let keysToRemove: Array<StateSchemaKey> = [];

    return {
        // просто вернёт редьюсеры
        getReducerMap: () => reducers,
        // функция reducer
        reduce: (state: StateSchema, action: AnyAction) => {
            // если в массиве есть ключи для удаления
            if (keysToRemove.length > 0) {
                state = { ...state };
                // удаляем из state reducer по ключу
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }

            return combinedReducer(state, action);
        },
        // добавить в reducers по ключу новый редюсер
        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }

            reducers[key] = reducer;

            combinedReducer = combineReducers(reducers);
        },
        // удаляем из reducers по ключу
        // и добавляем в keysToRemove ключ
        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }
            delete reducers[key];

            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        },
    };
}
