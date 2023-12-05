import {
    ImgHTMLAttributes, ReactElement, memo, useLayoutEffect, useState,
} from 'react';
// Наследуюем для компонента пропсы HTMLImageElement
interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        src,
        alt = 'image',
        fallback,
        errorFallback,
        ...otherProps
    } = props;
    // Состояние загрузки - по умолчанию true
    const [isLoading, setIsLoading] = useState(true);
    // Состояние ошибки
    const [hasError, setHasError] = useState(false);
    // отрабатывает синхроно перед вмонтированием
    useLayoutEffect(() => {
        const image = new Image();
        image.src = src ?? '';
        // onload - когда изображение закончило грузиться
        image.onload = () => {
            setIsLoading(false);
        };
        //  onerror - когда при загрузке изображения - произошла ошибка
        image.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    // При наличии пропса fallback - отрисовываем его
    if (isLoading && fallback) {
        return fallback;
    }
    // При наличии пропса errorFallback - отрисовываем его
    if (hasError && errorFallback) {
        return errorFallback;
    }

    return (
        <img src={src} alt={alt} className={className} {...otherProps} />
    );
});
