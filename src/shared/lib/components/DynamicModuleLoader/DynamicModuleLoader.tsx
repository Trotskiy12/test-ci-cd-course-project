import { FC, useEffect } from 'react';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';

export type ReducersList = {
    // eslint-disable-next-line no-unused-vars
    [name in StateSchemaKey]?: Reducer
}

type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        children, reducers, removeAfterUnmount,
    } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        // При использовании ReducersList внутри forEach мы будем терять StateSchemaKey
        Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
            store.reducerManager.add(name, reducer);
            dispatch({ type: `@@INIT ${name} REDUCER` });
        });
        // в момент монтирования компонента, с помощью reducerManager'a будем добавлять в корневой reducer loginReducer
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]: ReducersListEntry) => {
                    store.reducerManager.remove(name);
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