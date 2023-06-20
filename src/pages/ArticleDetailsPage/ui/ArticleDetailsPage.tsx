/* eslint-disable i18next/no-literal-string */
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t } = useTranslation('article');
    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            ARTICLE DETAILS PAGE
        </div>
    );
};

export default memo(ArticleDetailsPage);
