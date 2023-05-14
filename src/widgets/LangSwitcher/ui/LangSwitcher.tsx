import { classNames } from "shared/lib/classNames/classNames";
import cls from './LangSwitcher.module.scss';
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({className}: LangSwitcherProps) => {
    // инпортируем функцию t и объект i18n
    const { t, i18n } = useTranslation()

    const toggle = () => {
        // изменяем текущий язык в i18n
        i18n.changeLanguage(i18n.language === 'ru' ? 'en': 'ru');
    }
    return (
        <Button
            onClick={toggle} 
            theme={ThemeButton.CLEAR} 
            className={classNames(cls.langSwitcher, {}, [className])}
        >
            {t('change-lng')}
        </Button>
    );
}