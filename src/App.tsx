import { Route, Routes } from "react-router-dom";
import './index.scss';
import { Link } from "react-router-dom";
import { Suspense } from "react";
import { AboutAsyncPage } from "./pages/AboutPage/AboutPage.async";
import { MainAsyncPage } from "./pages/MainPage/MainPage.async";
export const App = () => {
    return (
        <div className="app">
            <Link to={'/'}>Main </Link>
            <Link to={'/about'}>About </Link>
            <Suspense fallback={<div>loading...</div>}>
            <Routes>
                <Route path={'/about'} element={<AboutAsyncPage />}/>
                <Route path={'/'}  element={<MainAsyncPage/> }/>
            </Routes>
            </Suspense>
        </div>
    )
}