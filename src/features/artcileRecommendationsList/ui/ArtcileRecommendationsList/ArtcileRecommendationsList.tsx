/* eslint-disable i18next/no-literal-string */
// import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

import { ArticleList } from '@/entities/Article';
import { TextSize } from '@/shared/const/textConsts';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ArtcileRecommendationsListProps {
    className?: string;
}

export const ArtcileRecommendationsList = memo((props: ArtcileRecommendationsListProps) => {
    const { className } = props;
    // const { t } = useTranslation();
    const { data: articles, isLoading, error } = useArticleRecommendationsList(3);
    // TODO: Обработать кейсы на загрузку и ошибку
    if (isLoading || error || !articles) {
        return null;
    }

    return (
        <VStack gap="8" className={classNames('', {}, [className])}>
            <Text
                size={TextSize.L}
                title="Рекомендуем"
            />
            <ArticleList
                articles={articles}
                target="_blank"
            />
        </VStack>
    );
});
