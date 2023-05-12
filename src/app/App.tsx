import { Route, Routes } from "react-router-dom";
import './styles/index.scss';
import { Link } from "react-router-dom";
import { Suspense } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";

export const App = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>THEME TOGGLER</button>
            <Link to={'/'}>Main </Link>
            <Link to={'/about'}>About </Link>
            <Suspense fallback={<div>loading...</div>}>
            <Routes>
                <Route path={'/about'} element={<AboutPage />}/>
                <Route path={'/'}  element={<MainPage/> }/>
            </Routes>
            </Suspense>
        </div>
    )
}