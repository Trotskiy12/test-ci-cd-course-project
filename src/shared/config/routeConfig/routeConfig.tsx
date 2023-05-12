import { AboutPage } from "pages/AboutPage"
import { MainPage } from "pages/MainPage"
import { RouteProps } from "react-router-dom"

// список роутов, который находится в приложении
export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about'
}

// для каждого маршрута из AppRoutes укажем путь до компонентов
export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about'
}

// объявляем роуты
export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />
    },
}