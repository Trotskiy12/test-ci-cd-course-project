// тип для мода сборки
export type BuildMode = 'production' | 'development';

// тип для путей сборки
export interface BuildPaths {
    entry: string; // путь для точки входа
    output: string; // путь для результата сборки
    html: string; // путь для html файла
    src: string; // пусть до src
}

// Тип для опций сборки
export interface BuildOptions { 
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
}

// тип для переменных окружения
export interface BuildEnv {
    mode: BuildMode
    port: number;
}