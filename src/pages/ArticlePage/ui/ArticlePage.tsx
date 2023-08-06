/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlePage.module.scss';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleList, ArticleView } from 'entities/Article';

interface ArticlePageProps {
    className?: string;
}

const ArticlePage = ({ className }: ArticlePageProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t } = useTranslation('article');
    return (
        <div className={classNames(cls.ArticlePage, {}, [className])}>
            <ArticleList
                isLoading
                view={ArticleView.BIG}
                articles={[]}
            />
        </div>
    );
};

export default memo(ArticlePage);
