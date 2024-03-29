/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlePage } from '../../model/services/initArticlePage/initArticlePage';
import { articlePageReducer } from '../../model/slices/articlePageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlePageFilters } from '../ArticlePageFilters/ArticlePageFilters';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispacth } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/widgets/Page';

import cls from './ArticlePage.module.scss';

interface ArticlePageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlePageReducer,
};

const ArticlePage = (props: ArticlePageProps) => {
    const { className } = props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t } = useTranslation('article');
    const dispatch = useAppDispacth();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlePage(searchParams));
    });

    // При установке ключа removeAfterUnmount - проблему с тем, что статьи нужно проскролить заново для подгрузки - уходит
    // Но остается проблема, что несколько раз выполняется action на инициализацию
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlePage, {}, [className])}
            >
                <ArticlePageFilters />
                <ArticleInfiniteList className={cls.list} />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlePage);
