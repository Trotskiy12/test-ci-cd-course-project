/* eslint-disable i18next/no-literal-string */
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from 'entities/Article';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { id } = useParams<{id: string}>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t } = useTranslation('article');

    if (!id) {
        return (
            <div className={classNames(cls.ArticlePage, {}, [className])}>
                Статья не найдена
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticlePage, {}, [className])}>
            <ArticleDetails id={id} />
        </div>
    );
};

export default memo(ArticleDetailsPage);
