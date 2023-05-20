import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
// eslint-disable-next-line max-len
import { Theme } from '../../src/app/providers/ThemeProvider';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
// eslint-disable-next-line arrow-parens
addDecorator(storyFn => (
    <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>
));
