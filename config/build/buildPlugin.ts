import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// Функция для плагинов
export function buildPlugin({ paths, isDev, apiUrl }: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        // Работа с HTML
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        // Прогресс сборки
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            // Для чанков, которые будут асинхронно подгружаться
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        // Плагин - прокидывать в приложение глобальные переменные
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
        }),
    ];

    if (isDev) {
        // Обновить приложение без обновления страницы
        plugins.push(new webpack.HotModuleReplacementPlugin());
        // Анализатор bundle
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }));
    }

    return plugins;
}
