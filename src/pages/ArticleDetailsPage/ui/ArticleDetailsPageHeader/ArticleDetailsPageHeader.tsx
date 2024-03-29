/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getCanEditArticle } from '../../model/selectors/article';

import { getArticleDetailsData } from '@/entities/Article';
import { ThemeButton } from '@/shared/const/buttonConsts';
import { getRouteArticles, getRouteArticlesEdit } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticlesEdit(article?.id));
        }
    }, [article, navigate]);

    return (
        <HStack max justify="between" className={classNames('', {}, [className])}>
            <Button
                theme={ThemeButton.OUTLINE}
                onClick={onBackToList}
            >
                Назад к списку
            </Button>
            {canEdit && (
                <Button
                    theme={ThemeButton.OUTLINE}
                    onClick={onEditArticle}
                >
                    Редактировать
                </Button>
            )}
        </HStack>
    );
});
