/* eslint-disable i18next/no-literal-string */
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getArticleComments } from '../model/slice/articleDetailsCommentSlice';
import {
    getArticleRecommendation,
} from '../model/slice/articleDetailsRecommendationsSlice';
import { useSelector } from 'react-redux';
import {
    // getArticleCommentsError,
    getArticleCommentsIsLoading,
} from '../model/selectors/comments';
import { useAppDispacth } from 'shared/lib/hooks/useAppDispatch';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { AddCommentForm } from 'features/addCommentForm';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';
import { Button } from 'shared/ui/Button/Button';
import { ThemeButton } from '../../../shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page/Page';
import { getArticleRecommendationsIsLoading } from '../model/selectors/recommendations';
import { fetchArticleRecommendations } from '../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../model/slice';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { id } = useParams<{id: string}>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t } = useTranslation('article');
    const dispatch = useAppDispacth();
    const navigate = useNavigate();
    // const error = useSelector(getArticleCommentsError);
    const comment = useSelector(getArticleComments.selectAll);
    const recommendations = useSelector(getArticleRecommendation.selectAll);
    const commentIsLoading = useSelector(getArticleCommentsIsLoading);
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    });

    if (!id) {
        return (
            <Page className={classNames(cls.ArticlePage, {}, [className])}>
                Статья не найдена
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticlePage, {}, [className])}>
                <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
                    Назад к списку
                </Button>
                <ArticleDetails id={id} />
                <Text
                    size={TextSize.L}
                    className={cls.commentTitle}
                    title="Рекомендуем"
                />
                <ArticleList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    className={cls.recommendations}
                    target="_blank"
                />
                <Text
                    size={TextSize.L}
                    className={cls.commentTitle}
                    title="Комментарии"
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList isLoading={commentIsLoading} comments={comment} />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
