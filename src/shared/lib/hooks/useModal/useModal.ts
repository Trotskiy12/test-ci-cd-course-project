import {
    useState, useRef, MutableRefObject, useEffect, useCallback,
} from 'react';

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay: number;
}

export function useModal({
    animationDelay, onClose, isOpen,
}: UseModalProps) {
    const [isClosing, setIsClosing] = useState(false);
    // будет отвечать, вмонтированна у нас модалка в дом-дерево или нет
    // useRef работает с MutableRefObject<t> - можно изменять и RefObject<T> - readonly
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    useEffect(() => {
        // проверка: если открыт компонент - то мы говорим, что он уже вмонтировался в дерево
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            // current тут read-only, так как ref может быть мутабельным и имутабельным
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);

    // На каждый ререндер - будут создаваться новые ссылки на функции
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            close();
        }
    }, [close]);

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

    return {
        isClosing,
        isMounted,
        close,
    };
}
