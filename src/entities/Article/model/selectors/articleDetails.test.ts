import { StateSchema } from 'app/providers/StoreProvider';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from './articleDetails';

describe('articleDetails', () => {
    test('should return data', () => {
        const article = {
            id: '1',
            title: 'subtitle',
        };
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: article,
            },
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual(article);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
    });
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'test',
            },
        };
        expect(getArticleDetailsError(state as StateSchema)).toEqual('test');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
        };
        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
    });
    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true,
            },
        };
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
        };
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
    });
});
