import { FC, useMemo, useState } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "../lib/ThemeContext";

/*
    localStorage всегда вернёт сроку, а useState ждет Theme необходимо воспользоваться кастом к типу
    если localStorage пустой - используем Theme.LIGHT
*/
const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;
/*
    Добавим FC - скажем, что ThemeProvider Functional Component
    Сразу станет доступен props children
*/
const ThemeProvider: FC = ({children}) => {
    // localStorage всегда вернёт сроку, а useState ждет Theme необходимо воспользоваться кастом к типу
    const [theme, setTheme] = useState<Theme>(defaultTheme);
    /*
        useMemo - мемоизировать значения объекта, 
        чтобы каждый раз не создавался новый, 
        пока не изменится массив зависимостей 
    */
    const defaultProps = useMemo(() => ({
        theme: theme,
        setTheme: setTheme
    }), [theme])

    return ( 
        // Так как Provider будет оборачивать компонент
        // ему нужен props.children
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
}
 
export default ThemeProvider;