import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

type useThemeResult = {
	toggleTheme: () => void;
	theme: Theme;
};

export function useTheme(): useThemeResult {
    // Получаем данные из контекста
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        // Изменяем состояние
        setTheme(newTheme);
        // Сохраняем тему в localStorage
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return { theme, toggleTheme };
}
