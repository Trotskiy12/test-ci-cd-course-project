import { memo, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

import { AppLinkTheme } from '../../const/appLinkConsts';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

//  Расширяем интерфейс, чтобы можно было использовать пропсы для Link
type AppLinkProps = {
	className?: string;
	theme?: AppLinkTheme;
    children?: ReactNode;
} & LinkProps;

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to,
        theme = AppLinkTheme.PRIMARY,
        children,
        className,
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            {...otherProps}
            className={classNames(cls.appLink, {}, [className, cls[theme]])}
        >
            {children}
        </Link>
    );
});
