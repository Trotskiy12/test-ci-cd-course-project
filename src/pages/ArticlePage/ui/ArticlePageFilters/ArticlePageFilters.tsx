/* eslint-disable i18next/no-literal-string */
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
    getArticlePageOrder,
    getArticlePageSearch,
    getArticlePageSort,
    getArticlePageType,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticleList } from '../../model/services/fetchArticleList/fetchArticleList';
import { articlePageActions } from '../../model/slices/articlePageSlice';

import {
    ArticleSortField, ArticleType, ArticleView,
} from '@/entities/Article';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispacth } from '@/shared/lib/hooks/useAppDispatch';
import { useDebounse } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';

import cls from './ArticlePageFilters.module.scss';

interface ArticlePageFiltersProps {
    className?: string;
}

export const ArticlePageFilters = ({ className }: ArticlePageFiltersProps) => {
    const dispatch = useAppDispacth();
    const view = useSelector(getArticlesPageView);
    const sort = useSelector(getArticlePageSort);
    const order = useSelector(getArticlePageOrder);
    const search = useSelector(getArticlePageSearch);
    const type = useSelector(getArticlePageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticleList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounse(fetchData, 500);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageActions.setView(view));
    }, [dispatch]);

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlePageActions.setSort(newSort));
        dispatch(articlePageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlePageActions.setOrder(newOrder));
        dispatch(articlePageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlePageActions.setSearch(search));
        dispatch(articlePageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    const onChangeType = useCallback((value: ArticleType) => {
        dispatch(articlePageActions.setType(value));
        dispatch(articlePageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    return (
        <div className={classNames(cls.ArticlePageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector
                    view={view}
                    onViewClick={onChangeView}
                />
            </div>
            <Card className={cls.search}>
                <Input
                    placeholder="Поиск"
                    value={search}
                    onChange={onChangeSearch}
                />
            </Card>
            <ArticleTypeTabs
                onChangeType={onChangeType}
                value={type}
                className={cls.tabs}
            />
        </div>
    );
};
