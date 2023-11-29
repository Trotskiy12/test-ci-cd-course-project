/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';

import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const userData = useSelector(getUserAuthData);

    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? '',
    });

    const [rateArticleMutation] = useRateArticle();

    const handleRateArtcile = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id ?? '',
                articleId,
                rate: starsCount,
                feedback,
            });
        } catch (e) {
            console.log(e);
        }
    }, [articleId, rateArticleMutation, userData?.id]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArtcile(starsCount, feedback);
    }, [handleRateArtcile]);

    const onCancel = useCallback((starsCount: number) => {
        handleRateArtcile(starsCount);
    }, [handleRateArtcile]);

    if (isLoading) {
        return <Skeleton width="100%" height={120} />;
    }

    const rating = data?.[0];

    return (
        <RatingCard
            rate={rating?.rate}
            className={className}
            title="Оцените статью"
            feedbackTitle="Оставьте отзыв о статье"
            hasFeedback
            onAccept={onAccept}
            onCancel={onCancel}
        />
    );
});

export default ArticleRating;
