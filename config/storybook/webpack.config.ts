import path from 'path';

import webpack, { DefinePlugin, RuleSetRule } from 'webpack';

import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        output: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
        locales: '',
        buildLocales: '',
    };
    config.resolve?.modules?.push(paths.src);
    config.resolve?.extensions?.push('.ts', '.tsx');
    config!.resolve!.alias = {
        ...config!.resolve!.alias,
        '@': paths.src,
    };

    // eslint-disable-next-line no-param-reassign
    // remove svg from existing rule
    if (config.module) {
        // eslint-disable-next-line no-param-reassign
        config.module.rules = config.module.rules
            ? config.module.rules.map((rule: RuleSetRule | '...') => {
                // eslint-disable-next-line max-len
                if (rule !== '...' && rule.test instanceof RegExp && rule.test.toString().includes('svg')) {
                    return { ...rule, exclude: /\.svg$/i };
                }

                return rule;
            })
            : [];
    }

    // use svgr for svg files
    config?.module?.rules?.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
    });
    config?.module?.rules?.push(buildCssLoader(true));

    config.plugins?.push(new DefinePlugin({
        __IS_DEV__: true,
        // любое значение указать
        __API__: JSON.stringify('https://testapi.ru'),
        __PROJECT__: JSON.stringify('storybook'),
    }));

    return config;
};
