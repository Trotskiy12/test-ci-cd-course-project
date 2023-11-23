import { useMemo, useState, ReactNode } from 'react';
import {
    ThemeContext,
} from '../../../../shared/lib/context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';

/*
    LocalStorage всегда вернёт сроку, а useState ждет Theme необходимо воспользоваться кастом к типу
    если localStorage пустой - используем Theme.LIGHT
*/
const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme
    || Theme.LIGHT;

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}
/*
    Добавим FC - скажем, что ThemeProvider Functional Component
    Сразу станет доступен props children
    С 18 реакта из FC убрали пропс children - использование FC ради этого пропса - больше неактуально
*/
const ThemeProvider = (props: ThemeProviderProps) => {
    const {
        initialTheme,
        children,
    } = props;
    // LocalStorage всегда вернёт сроку,
    // а useState ждет Theme необходимо воспользоваться кастом к типу
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);
    /*
        UseMemo - мемоизировать значения объекта,
        чтобы каждый раз не создавался новый,
        пока не изменится массив зависимостей
    */
    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
    // Так как Provider будет оборачивать компонент
    // ему нужен props.children
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
