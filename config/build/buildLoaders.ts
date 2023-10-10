import type webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { type BuildOptions } from './types/config';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodebabelLoader = buildBabelLoader({ ...options, isTsx: true });

    const cssLoader = buildCssLoader(isDev);

    // Порядок при котором лоадеры возвращаются в массиве - имеет значение
    // лучшая практика - выносить лоадер в переменную, чтобы проще отследить последовательность
    // const typescriptLoader = {
    //     // Регулярка для файлов tsx
    //     test: /\.tsx?$/,
    //     // Лоадер, который будем применять для файлов
    //     use: 'ts-loader',
    //     // Исключаем node_modules
    //     exclude: /node_modules/,
    // };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff|woff2)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    return [
        fileLoader,
        svgLoader,
        // babelLoader,
        // typescriptLoader,
        codeBabelLoader,
        tsxCodebabelLoader,
        cssLoader,
    ];
}
