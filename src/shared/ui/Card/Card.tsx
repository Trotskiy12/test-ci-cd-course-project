import { HTMLAttributes, ReactNode, memo } from 'react';

import { CardTheme } from '../../const/cardConsts';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
    fullWidth?: boolean;
}

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        theme = CardTheme.NORMAL,
        fullWidth,
        ...otherProps
    } = props;
    return (
        <div
            className={classNames(cls.Card, { [cls.max]: fullWidth }, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
