import { classNames } from "shared/lib/classNames/classNames";
import cls from './AppLink.module.scss';
import { Link, LinkProps } from "react-router-dom";
import { FC } from "react";

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

//  расширяем интерфейс, чтобы можно было использовать пропсы для Link
interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme
}

export const AppLink: FC<AppLinkProps> = (props) => {

    const { 
        to, 
        theme = AppLinkTheme.PRIMARY,
        children, 
        className, 
        ...otherProps
    } = props;

    return (
        <Link to={to} {...otherProps} className={classNames(cls.appLink, {}, [className, cls[theme]])}>
            {children}
        </Link>
    );
}