//
import { render } from '@testing-library/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { DeepPartial } from 'redux';
import i18nForTests from 'shared/config/i18n/i18nForTests';

export interface ComponentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>
}

// Функция оборачивает тестируемый компонент в обёртку и добавляет тестовую конфигурацию из i18n
// Также для тестирования с react-router-dom компонентов, необходимо всё обернуть в MemoryRouter
export function componentRender(component: ReactNode, options: ComponentRenderOptions = {}) {
    const {
        route = '/',
        initialState,
    } = options;
    return render(
        // Добавляем StoreProvider, чтобы тестировать компоненты, которые используют Redux state
        <StoreProvider initialState={initialState}>
            {/* Добавляем MemoryRouter, чтобы тестировать компоненты, которые используют routing */}
            <MemoryRouter initialEntries={[route]}>
                <I18nextProvider i18n={i18nForTests}>
                    {component}
                </I18nextProvider>
            </MemoryRouter>
        </StoreProvider>,
    );
}
