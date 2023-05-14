import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    }

    const babelLoader = {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env'],
                "plugins": [
                    [
                        "i18next-extract",
                        {
                            locales: ['ru', 'en'],
                            keyAsDefaultValue: true
                        }
                    ]
                ],
            }
        }
    }

    const cssLoader = {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              // Translates CSS into CommonJS
              {
                loader: "css-loader",
                options:  {
                    modules: {
                        // функция проверяющая содержит ли имя файла module
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        // в prodcution сборке - сгенерированные названия, в development - обычные названия для простоты debug
                        localIdentName: isDev 
                            ? `[path][name]__[local]--[hash:base64:5]` 
                            : '[hash:base64:8]'
                    },
                }
              },
              // Compiles Sass to CSS
              "sass-loader",
            ],
    }

    // порядок при котором лоадеры возвращаются в массиве - имеет значение
    // лучшая практика - выносить лоадер в переменную, чтобы проще отследить последовательность
    const typescriptLoader = {
        // регулярка для файлов tsx
        test: /\.tsx?$/,
        // лоадер, который будем применять для файлов
        use: 'ts-loader',
        // исключаем node_modules
        exclude: /node_modules/,
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff|woff2)$/i,
        use: [
            {
                loader: 'file-loader'
            },
        ],
    }

    return [
        fileLoader,
        svgLoader,
        babelLoader,
        typescriptLoader,
        cssLoader
    ]
}