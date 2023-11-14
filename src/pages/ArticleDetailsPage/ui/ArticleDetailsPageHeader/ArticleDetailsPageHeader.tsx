/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/shared/const/router';
import { Button } from '@/shared/ui/Button/Button';
import { ThemeButton } from '@/shared/const/buttonConsts';
import { useSelector } from 'react-redux';
import { getCanEditArticle } from '../../model/selectors/article';
import { getArticleDetailsData } from '@/entities/Article';
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
        navigate(RoutePath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.articles_details}${article?.id}/edit`);
    }, [article?.id, navigate]);

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
