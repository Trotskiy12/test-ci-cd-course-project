/* eslint-disable i18next/no-literal-string */
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { ThemeButton } from '@/shared/const/buttonConsts';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from '@/features/AuthByUsername';
import { useSelector } from 'react-redux';
import {
    getUserAuthData,
} from '@/entities/User';
import { Text } from '@/shared/ui/Text/Text';
import { TextTheme } from '@/shared/const/textConsts';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { AppLinkTheme } from '@/shared/const/appLinkConsts';
import { RoutePath } from '@/shared/const/router';
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    // различаем navbar авторизованного пользователя
    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text
                    theme={TextTheme.INVERTED}
                    className={cls.appName}
                    title="DenchikApp"
                />
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={RoutePath.articles_create}
                    className={cls.createBtn}
                >
                    Создать статью
                </AppLink>
                <HStack gap="16" className={cls.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={onShowModal}>
                Войти
            </Button>
            {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
        </header>
    );
});
