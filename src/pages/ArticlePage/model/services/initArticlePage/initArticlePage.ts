import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    getArticlePageInited,
} from '../../selectors/articlesPageSelectors';
import { articlePageActions } from '../../slices/articlePageSlice';
import { fetchArticleList } from '../fetchArticleList/fetchArticleList';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

// createAsyncThunk<Что возвращаем, Аргумент>
export const initArticlePage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlePage/initArticlePage',
    async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const inited = getArticlePageInited(getState());
        // если state еще не проинициализирован
        if (!inited) {
            const orderFromUrl = searchParams.get('order') as SortOrder;
            const sortFromUrl = searchParams.get('sort') as ArticleSortField;
            const searchFromUrl = searchParams.get('search');
            const typeFromUrl = searchParams.get('type') as ArticleType;

            if (orderFromUrl) {
                dispatch(articlePageActions.setOrder(orderFromUrl));
            }
            if (sortFromUrl) {
                dispatch(articlePageActions.setSort(sortFromUrl));
            }
            if (searchFromUrl) {
                dispatch(articlePageActions.setSearch(searchFromUrl));
            }
            if (typeFromUrl) {
                dispatch(articlePageActions.setType(typeFromUrl));
            }

            dispatch(articlePageActions.initState());
            dispatch(fetchArticleList({}));
        }
    },

);
