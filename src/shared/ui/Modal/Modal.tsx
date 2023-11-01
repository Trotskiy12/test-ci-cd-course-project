import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { ReactNode } from 'react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

interface ModalProps {
    className?: string;
    // Главный prop для модального окна
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

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

    const {
        close,
        isClosing,
        isMounted,
    } = useModal({
        animationDelay: 300,
        onClose,
        isOpen,
    });

    const { theme } = useTheme();

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
                <Overlay onClick={close} className={cls.overlay} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
