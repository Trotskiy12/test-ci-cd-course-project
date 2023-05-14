import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// Функция для плагинов
export function buildPlugin({paths, isDev}: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        // прогресс сборки
        new webpack.ProgressPlugin(),
        // Работа с HTML
        new HtmlWebpackPlugin({
            template: paths.html
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            // для чанков, которые будут асинхронно подгружаться
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        // плагин - прокидывать в приложение глобальные переменные
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev)
        }),
        // обновить приложение без обновления страницы
        new webpack.HotModuleReplacementPlugin()
    ]
}