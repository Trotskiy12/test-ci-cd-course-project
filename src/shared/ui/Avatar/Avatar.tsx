import { CSSProperties, useMemo } from 'react';

import UserIcon from '../../assets/icons/user.svg';
import { AppImage } from '../AppImage';
import { Icon } from '../Icon/Icon';
import { Skeleton } from '../Skeleton';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
}

export const Avatar = ({
    className, src, size = 100, alt, fallbackInverted,
}: AvatarProps) => {
    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(() => ({
        width: size,
        height: size,
    }), [size]);

    const fallback = <Skeleton width={size} height={size} border="50%" />;
    const errorFallback = <Icon inverted={fallbackInverted} width={size} height={size} Svg={UserIcon} />;

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            alt={alt}
            src={src}
            style={styles}
            className={classNames(cls.Avatar, mods, [className])}
        />
    );
};
