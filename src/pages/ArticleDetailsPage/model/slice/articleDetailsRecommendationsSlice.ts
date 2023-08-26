import {
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';
import { StateSchema } from '../../../../app/providers/StoreProvider/config/StateSchema';
import { Article } from '../../../../entities/Article/model/types/article';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';

const recommendationsAdapter = createEntityAdapter<Article>({
    // функция получения id, по которому будет нормализация данных
    selectId: (article) => article.id,

});

export const getArticleRecommendation = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

const articleDetailsRecommendationsSlice = createSlice({
    name: 'articleDetailsRecommendationsSlice',
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                recommendationsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articleDetailsRecommendationsReducer } = articleDetailsRecommendationsSlice;
