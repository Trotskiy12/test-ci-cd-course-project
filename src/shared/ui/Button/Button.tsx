import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import {
    ButtonHTMLAttributes, ReactNode, memo,
} from 'react';
import cls from './Button.module.scss';
import { ThemeButton, ButtonSize } from '../../const/buttonConsts';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    theme?: ThemeButton;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ThemeButton.OUTLINE,
        square,
        size = ButtonSize.M,
        disabled,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disabled]: disabled,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});

// Для каких компонентов лучше не использовать memo?
// Для тех, у которых есть children props
// Так как может быть древовидная структура - хранить дорого + memo не поможет, если содержимое будет меняться
// НО! В кнопке children - чаще всего примитив, например строка, сравнивать легко и хранить дешево
// Древовидная структура - это объект, объекты могут менять ссылку, даже два объекта, могут быть одинаковыми, но они хранят разные ссылки в памяти
// А строка - значение
