import React, {
    InputHTMLAttributes, memo, useEffect,
    useRef,
} from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './Input.module.scss';

// Так как value и onChange уже определены в InputHTMLAttributes<HTMLInputElement>
// Мы их исключим из типа, используя Omit
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autoFocus?: boolean;
    readonly?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autoFocus,
        readonly,
        ...otherProps
    } = props;
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (autoFocus) {
            ref.current?.focus();
        }
    }, [autoFocus]);
    // input в onChange принимает Event, но нам нужно отдавать value
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    return (
        <div className={classNames(cls.Input, mods, [className])}>
            {placeholder
                && (
                    <div className={cls.placeholder}>
                        {`${placeholder}>`}
                    </div>
                )}
            <div>
                <input
                    readOnly={readonly}
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.input}
                    {...otherProps}
                />
            </div>
        </div>
    );
});
