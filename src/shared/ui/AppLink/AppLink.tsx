import { classNames } from 'shared/lib/classNames/classNames';
import { Link, type LinkProps } from 'react-router-dom';
import { memo, ReactNode } from 'react';
import cls from './AppLink.module.scss';
import { AppLinkTheme } from '../../const/appLinkConsts';

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
