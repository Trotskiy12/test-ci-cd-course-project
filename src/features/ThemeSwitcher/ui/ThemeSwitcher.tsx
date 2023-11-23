import { classNames } from '@/shared/lib/classNames/classNames';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import { Button } from '../../../shared/ui/Button/Button';
import { ThemeButton } from '@/shared/const/buttonConsts';
import { memo } from 'react';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';

type ThemeSwitcherProps = {
	className?: string;
};

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
});
