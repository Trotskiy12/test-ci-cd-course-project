// Тип для мода сборки
export type BuildMode = 'production' | 'development';

// Тип для путей сборки
export type BuildPaths = {
	entry: string; // Путь для точки входа
	output: string; // Путь для результата сборки
	html: string; // Путь для html файла
	src: string; // Пусть до src
};

// Тип для переменных окружения
export type BuildEnv = {
	mode: BuildMode;
	port: number;
	apiUrl: string;
};

// Тип для опций сборки
export type BuildOptions = {
	mode: BuildMode;
	paths: BuildPaths;
	isDev: boolean;
	port: number;
	apiUrl: string;
};
