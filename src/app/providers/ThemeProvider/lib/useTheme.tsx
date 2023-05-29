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
        // если в body добавить в className тему, то мы избавнимся от постоянного навешивания в additionals theme
        document.body.className = newTheme;
        // Сохраняем тему в localStorage
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return { theme, toggleTheme };
}
