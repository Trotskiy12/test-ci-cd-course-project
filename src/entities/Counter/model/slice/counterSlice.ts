import { createSlice } from '@reduxjs/toolkit';

import { CounterSchema } from '../types/counterSchema';
// ImmerJs позволяет нам менять state - но линтер ругается на строчки state.value += 1
// no-param-reassign - противоречит концепции ImmerJs, поэтому в конфиге линтера отключим свойство

const initialState: CounterSchema = {
    value: 0,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

export const { actions: counterActions } = counterSlice;
export const { reducer: counterReducer } = counterSlice;
