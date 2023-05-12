import webpack from 'webpack';
import { BuildOptions } from './types/config';

// функция для resolvers
export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        // абсолютные пути в приоритете
        preferAbsolute: true,
        // передаем путь до папки src и до папки node_modules, там все пути абсолютные
        modules: [options.paths.src, 'node_modules'],
        // для каждого модуля, главным файлом будет index
        mainFiles: ['index'],
        alias: {}
    }
}