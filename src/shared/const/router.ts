// Список роутов, который находится в приложении

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLES_DETAILS = 'articles_details',
    ARTICLES_CREATE = 'articles_create',
    ARTICLES_EDIT = 'articles_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found'
}// Для каждого маршрута из AppRoutes укажем путь до компонентов

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ARTICLES_DETAILS]: '/articles/', // + :id
    [AppRoutes.ARTICLES_CREATE]: '/articles/new',
    [AppRoutes.ARTICLES_EDIT]: '/articles/:id/edit',
    [AppRoutes.ADMIN_PANEL]: '/admin',
    [AppRoutes.FORBIDDEN]: '/forbidden',
    // располагаем в конце списка, так как звездочка будет обработывать все пути
    // которые не отработали выше
    [AppRoutes.NOT_FOUND]: '*',
};
