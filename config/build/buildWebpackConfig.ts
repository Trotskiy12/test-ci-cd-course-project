import type webpack from 'webpack';

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugin } from './buildPlugin';
import { buildResolvers } from './buildResolvers';
import { type BuildOptions } from './types/config';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    // Деструктуризация пропса
    const { mode, paths, isDev } = options;
    return {
        mode, // => mode: mode
        // точка входа приложения
        entry: paths.entry,
        module: {
            // Конфигурируем loader, для обработки файлов, которые выходят за рамки JS
            rules: buildLoaders(options),
        },
        // Указываем расширение тех файлов, расширение которых мы не будем указывать
        resolve: buildResolvers(options),
        // Куда и как будет производится сборка
        output: {
            filename: '[name].[contenthash].js',
            path: paths.output,
            // Удаляем старые файл с предыдущей сборки
            clean: true,
            publicPath: '/',
        },
        plugins: buildPlugin(options),
        // Позволяет четко видеть, где в коде ошибка, так как
        // source map сопоставляет наш скомпилированный код с исходным кодом
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,

    };
}
