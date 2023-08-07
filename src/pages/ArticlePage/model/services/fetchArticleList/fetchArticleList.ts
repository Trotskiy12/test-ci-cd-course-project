import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

// createAsyncThunk<Что возвращаем, Аргумент>
export const fetchArticleList = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articlePage/fetchArticleList',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    // по id пользователя хотим получить всю информацию о нём
                    _expand: 'user',
                },
            });

            if (!response.data) {
                throw new Error();
            }

            // по умолчанию возвращаемые данные из Thunk образиваются в fulfillWithValue
            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },

);
