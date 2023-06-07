import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import React, {
    MutableRefObject,
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider';

interface ModalProps {
    className?: string;
    // Главный prop для модального окна
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

// props.lazy -  загрузка модалки лениво - понадобиться для того случае,
// если какой-то компонент придется подгружать асинхронно - уменьшение бандла
export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    // будет отвечать, вмонтированна у нас модалка в дом-дерево или нет
    // useRef работает с MutableRefObject<t> - можно изменять и RefObject<T> - readonly
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const { theme } = useTheme();

    useEffect(() => {
        // проверка: если открыт компонент - то мы говорим, что он уже вмонтировался в дерево
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            // current тут read-only, так как ref может быть мутабельным и имутабельным
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    // На каждый ререндер - будут создаваться новые ссылки на функции
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };
    // все асинхронные операции важно очищать в useEffect
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
        [cls[theme]]: true,
    };

    // если у нас ленивая загрузка и модалка не вмонтированна в дом-дерево
    // то возвращаем null - не отрисовываем модалку
    if (lazy && !isMounted) {
        return null;
    }
    // В этот компоненте memo не имеет смысла, так как children всегда компонент с древовидной структурой
    return (
        <Portal>
            <div className={classNames(cls.modal, mods, [className, theme, 'app_modal'])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
