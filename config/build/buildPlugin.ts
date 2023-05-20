import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// Функция для плагинов
export function buildPlugin({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        // Прогресс сборки
        new webpack.ProgressPlugin(),
        // Работа с HTML
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            // Для чанков, которые будут асинхронно подгружаться
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        // Плагин - прокидывать в приложение глобальные переменные
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),
        // Обновить приложение без обновления страницы
        new webpack.HotModuleReplacementPlugin(),
        // new BundleAnalyzerPlugin({
        //     openAnalyzer: false,
        // }),
    ];
}
