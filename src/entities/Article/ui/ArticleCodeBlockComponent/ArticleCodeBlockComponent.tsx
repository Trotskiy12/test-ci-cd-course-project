/* eslint-disable i18next/no-literal-string */
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
    className?: string;
}

export const ArticleCodeBlockComponent = ({ className }: ArticleCodeBlockComponentProps) => (
    <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
        ArticleCodeBlockComponent
    </div>
);
