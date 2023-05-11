import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildLoaders } from "./buildLoaders";
import { buildPlugin } from "./buildPlugin";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    // деструктуризация пропса
    const {mode, paths, isDev} = options;
    return {
        mode, // => mode: mode
        // точка входа приложения 
        entry: paths.entry,
        module: {
            // конфигурируем loader, для обработки файлов, которые выходят за рамки JS
            rules: buildLoaders(options)
        },
        // указываем расширение тех файлов, расширение которых мы не будем указывать
        resolve: buildResolvers(),
        // куда и как будет производится сборка 
        output: {
            filename: '[name].[contenthash].js',
            path: paths.output,
            // удаляем старые файл с предыдущей сборки
            clean: true
        },
        plugins: buildPlugin(options),
        // позволяет четко видеть, где в коде ошибка, так как source map сопоставляет наш скомпилированный код с исходным кодом
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined
    }
}