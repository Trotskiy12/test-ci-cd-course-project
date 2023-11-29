/* eslint-disable i18next/no-literal-string */
import { useCallback } from 'react';

import CopyIcon from '../../assets/icons/copy.svg';
import { Button } from '../Button/Button';

import { ThemeButton } from '@/shared/const/buttonConsts';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = (props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button className={cls.copyBtn} theme={ThemeButton.CLEAR} onClick={onCopy}>
                <CopyIcon className={cls.copyIcon} />
            </Button>
            <code>
                {text}
            </code>
        </pre>
    );
};
