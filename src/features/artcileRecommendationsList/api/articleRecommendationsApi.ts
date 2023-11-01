import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // получение данных -> query
        getArticleRecommendationList: build.query<Article[], number>({
            // настройки http запроса
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
        // для изменения данных -> mutation
    }),
});

export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationListQuery;
