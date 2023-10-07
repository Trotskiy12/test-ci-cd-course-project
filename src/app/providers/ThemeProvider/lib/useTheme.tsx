import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, ThemeContext } from './ThemeContext';
import { Theme } from '../consts/consts';

type useThemeResult = {
	toggleTheme: () => void;
	theme: Theme;
};

export function useTheme(): useThemeResult {
    // Получаем данные из контекста
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        // const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        let newTheme: Theme;
        switch (theme) {
        case Theme.DARK:
            newTheme = Theme.LIGHT;
            break;
        case Theme.LIGHT:
            newTheme = Theme.ORANGE;
            break;
        case Theme.ORANGE:
            newTheme = Theme.DARK;
            break;
        default:
            newTheme = Theme.LIGHT;
            break;
        }
        // Изменяем состояние
        // фунцкия может быть undifined , так как контекст инициализируется не сразу
        setTheme?.(newTheme);
        // если в body добавить в className тему, то мы избавнимся от постоянного навешивания в additionals theme
        document.body.className = newTheme;
        // Сохраняем тему в localStorage
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return { theme: theme || Theme.LIGHT, toggleTheme };
}
