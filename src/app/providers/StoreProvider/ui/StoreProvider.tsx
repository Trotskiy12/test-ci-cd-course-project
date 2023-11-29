import { ReducersMapObject } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';
// import { useNavigate } from 'react-router-dom';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState, asyncReducers } = props;

    // const navigate = useNavigate();
    // Проблема в том, что navigate из-за происходит ререндер компонента - при изменении маршрута
    // Поэтому store пересоздается каждый раз на ререндер компонента
    // Новый store каждый раз, когда ререндериться компонент
    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        // navigate,
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
