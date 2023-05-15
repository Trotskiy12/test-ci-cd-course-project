import type webpack from 'webpack';
import { type BuildOptions } from './types/config';

// Функция для resolvers
export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        // Абсолютные пути в приоритете
        preferAbsolute: true,
        // Передаем путь до папки src и до папки node_modules, там все пути абсолютные
        modules: [options.paths.src, 'node_modules'],
        // Для каждого модуля, главным файлом будет index
        mainFiles: ['index'],
        alias: {},
    };
}
