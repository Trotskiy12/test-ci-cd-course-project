import { screen } from '@testing-library/react';

import AppRouter from './AppRouter';

import { UserRole } from '@/entities/User';
import { getRouteAbout, getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});
describe('app/router/AppRouter', () => {
    test('Страница отрисовывается', async () => {
        // рендерим страницу по пути
        componentRender(
            <AppRouter />,
            {
                route: getRouteAbout(),
            },
        );
        // поиск страницы по data-testid
        const page = await screen.findByTestId('AboutPage');
        // проверям отрисовалось ли страница в DOM дереве
        expect(page).toBeInTheDocument();
    });

    test('Страница не найдена', async () => {
        // рендерим страницу по пути
        componentRender(
            <AppRouter />,
            {
                route: '/test-path-for-not-found',
            },
        );
        // поиск страницы по data-testid
        const page = await screen.findByTestId('NotFoundPage');
        // проверям отрисовалось ли страница в DOM дереве
        expect(page).toBeInTheDocument();
    });

    test('Редирект неавторизованного пользователя на главную', async () => {
        // рендерим страницу по пути
        componentRender(
            <AppRouter />,
            {
                route: getRouteProfile('1'),
            },
        );
        // поиск страницы по data-testid
        const page = await screen.findByTestId('MainPage');
        // проверям отрисовалось ли страница в DOM дереве
        expect(page).toBeInTheDocument();
    });

    test('Доступ к закрытой странице для авторизованного пользователя', async () => {
        // рендерим страницу по пути
        componentRender(
            <AppRouter />,
            {
                route: getRouteProfile('1'),
                initialState: {
                    user: {
                        _inited: true,
                        authData: {}, // если не undefined - то пользователь авторизован
                    },
                },
            },
        );
        // поиск страницы по data-testid
        const page = await screen.findByTestId('ProfilePage');
        // проверям отрисовалось ли страница в DOM дереве
        expect(page).toBeInTheDocument();
    });

    test('Доступ к запрещён (отсутствует роль)', async () => {
        // рендерим страницу по пути
        componentRender(
            <AppRouter />,
            {
                route: getRouteAdmin(),
                initialState: {
                    user: {
                        _inited: true,
                        authData: {}, // если не undefined - то пользователь авторизован
                    },
                },
            },
        );
        // поиск страницы по data-testid
        const page = await screen.findByTestId('ForbiddenPage');
        // проверям отрисовалось ли страница в DOM дереве
        expect(page).toBeInTheDocument();
    });

    test('Доступ к разрешён (есть роль)', async () => {
        // рендерим страницу по пути
        componentRender(
            <AppRouter />,
            {
                route: getRouteAdmin(),
                initialState: {
                    user: {
                        _inited: true,
                        authData: {
                            roles: [UserRole.ADMIN],
                        }, // если не undefined - то пользователь авторизован
                    },
                },
            },
        );
        // поиск страницы по data-testid
        const page = await screen.findByTestId('AdminPanelPage');
        // проверям отрисовалось ли страница в DOM дереве
        expect(page).toBeInTheDocument();
    });
});
