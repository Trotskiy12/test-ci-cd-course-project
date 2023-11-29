import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    getArticlePageOrder,
    getArticlePageSearch,
    getArticlePageSort,
    getArticlePageType,
    getArticlesPageLimit,
    getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

interface FetchArtilclesListProps {
    replace?: boolean;
}

// createAsyncThunk<Что возвращаем, Аргумент>
export const fetchArticleList = createAsyncThunk<Article[], FetchArtilclesListProps, ThunkConfig<string>>(
    'articlePage/fetchArticleList',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        // const { page = 1 } = props;
        const limit = getArticlesPageLimit(getState());
        const page = getArticlesPageNum(getState());
        const sort = getArticlePageSort(getState());
        const order = getArticlePageOrder(getState());
        const search = getArticlePageSearch(getState());
        const type = getArticlePageType(getState());

        try {
            // через historyApi
            // window.history.pushState(null, '', `?search=${search}`);
            addQueryParams({
                sort, order, search, type,
            });
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    // по id пользователя хотим получить всю информацию о нём
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                    _sort: sort,
                    _order: order,
                    q: search,
                    type: type === ArticleType.ALL ? undefined : type,
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
