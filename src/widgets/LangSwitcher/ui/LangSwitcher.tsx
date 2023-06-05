import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

type LangSwitcherProps = {
	className?: string;
    short?: boolean;
};

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    // Инпортируем функцию t и объект i18n
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        // Изменяем текущий язык в i18n
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            onClick={toggle}
            theme={ThemeButton.CLEAR}
            className={classNames('', {}, [className])}
        >
            {t(short ? 'short-lng' : 'change-lng')}
        </Button>
    );
});
