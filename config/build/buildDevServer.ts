import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { type BuildOptions } from './types/config';
// Импортируем тип для конфигурации

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        // Автоматически открывает приложение в браузере
        open: false,
        // Позволяет проксировать запросы через index.html
        historyApiFallback: true,
        hot: true,
    };
}
