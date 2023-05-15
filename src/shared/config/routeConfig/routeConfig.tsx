import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { type RouteProps } from 'react-router-dom';

// Список роутов, который находится в приложении
export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
    NOT_FOUND = 'not_found'
}

// Для каждого маршрута из AppRoutes укажем путь до компонентов
export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    // располагаем в конце списка, так как звездочка будет обработывать все пути
    // которые не отработали выше
    [AppRoutes.NOT_FOUND]: '*',
};

// Объявляем роуты
export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
