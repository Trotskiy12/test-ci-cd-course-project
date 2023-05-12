import { BuildOptions } from "./types/config";
// импортируем тип для конфигурации
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        // автоматически открывает приложение в браузере
        open: true,
        // позволяет проксировать запросы через index.html
        historyApiFallback: true
    }
}