import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'

const config: webpack.Configuration = {
    mode: 'development',
    // точка входа приложения 
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    module: {
        // конфигурируем loader, для обработки файлов, которые выходят за рамки JS
        rules: [
            {
                // регулярка для файлов tsx
                test: /\.tsx?$/,
                // лоадер, который будем применять для файлов
                use: 'ts-loader',
                // исключаем node_modules
                exclude: /node_modules/,
            },
        ],
    },
    // указываем расширение тех файлов, расширение которых мы не будем указывать
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    // куда и как будет производится сборка 
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true
    },
    plugins: [
        // прогресс сборки
        new webpack.ProgressPlugin(),
        // Работа с HTML
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ]
}

export default config;