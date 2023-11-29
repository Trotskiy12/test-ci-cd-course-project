import { Reducer } from '@reduxjs/toolkit';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
}

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children?: ReactNode;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const {
        children, reducers, removeAfterUnmount = true,
    } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        // получение вмонтированных редьюсеров
        const mountedReducers = store.reducerManager.getMountedReducers();
        // При использовании ReducersList внутри forEach мы будем терять StateSchemaKey
        // Object.entries, когда достаёт ключи их объекта, воспринимает их как string
        Object.entries(reducers).forEach(([name, reducer]) => {
            // достаем редьюсер по name
            const mounted = mountedReducers[name as StateSchemaKey];
            // если редьюсер ещё не вмонтирован, то мы его добавляем
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@@INIT ${name} REDUCER` });
            }
        });
        // в момент монтирования компонента, с помощью reducerManager'a будем добавлять в корневой reducer loginReducer
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@@DESTROY ${name} REDUCER` });
                });
                // при размонтировании компонента этот reducer мы удаляем
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            { children }
        </>
    );
};
