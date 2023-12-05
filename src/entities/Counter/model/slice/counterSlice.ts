import { PayloadAction } from '@reduxjs/toolkit';

import { CounterSchema } from '../types/counterSchema';

import { buildSlice } from '@/shared/lib/store';
// ImmerJs позволяет нам менять state - но линтер ругается на строчки state.value += 1
// no-param-reassign - противоречит концепции ImmerJs, поэтому в конфиге линтера отключим свойство

const initialState: CounterSchema = {
    value: 0,
};

export const counterSlice = buildSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        add: (state, { payload }: PayloadAction<number>) => {
            state.value += payload;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

export const {
    actions: counterActions,
    reducer: counterReducer,
    useActions: useCounterActions,
} = counterSlice;
