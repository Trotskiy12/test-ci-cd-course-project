import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

const initialState: UserSchema = {

};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // reducer для сохранения пользователя после авторизации
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        //
        initAuthData: (state) => {
            // достаем пользователя из localStorage
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
