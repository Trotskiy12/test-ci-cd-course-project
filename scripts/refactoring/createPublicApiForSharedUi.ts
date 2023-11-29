import { Project } from 'ts-morph';
import path from 'path';
// Инициализируем инстанс класса
const project = new Project({});
// Добавляем в переменную все ts и tsx файлы
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');
// Получаем все файлы с помощью getSourceFiles()
const files = project.getSourceFiles();
// Формируем путь до shared/ui
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
// Получаем папку shared/ui
const sharedUiDirectory = project.getDirectory(uiPath);
// Получаем папки внутри shared/ui - массив
const componentsDirs = sharedUiDirectory?.getDirectories();

function isAbsolute(value: string) {
    const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
    return layers.some((layer) => value.startsWith(layer));
}

componentsDirs?.forEach((directory) => {
    const indexFilePath = `${directory.getPath()}/index.ts`;
    const indexFile = directory.getSourceFile(indexFilePath);
    if (!indexFile) {
        const sourceCode = `export * from './${directory.getBaseName()}'`;
        const file = directory.createSourceFile(indexFilePath, sourceCode, { overwrite: true });

        file.save();
    }
});

files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDec) => {
        // импорты в файлах
        const value = importDec.getModuleSpecifierValue();
        const valueWithoutAlias = value.replace('@/', '');

        const segments = valueWithoutAlias.split('/');
        const isSharedLayer = segments?.[0] === 'shared';
        const isUiSlice = segments?.[1] === 'ui';

        if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
            const result = valueWithoutAlias.split('/').slice(0, 3).join('/');
            importDec.setModuleSpecifier(`@/${result}`);
        }
    });
});

// Обязательный параметр, чтобы ts-morph применил изменения
project.save();
