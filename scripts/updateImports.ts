import { Project } from 'ts-morph';

// Инициализируем инстанс класса
const project = new Project({});
// Добавляем в переменную все ts и tsx файлы
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');
// Получаем все файлы с помощью getSourceFiles()
const files = project.getSourceFiles();

function isAbsolute(value: string) {
    const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
    return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDec) => {
        // импорты в файлах
        const value = importDec.getModuleSpecifierValue();

        if (isAbsolute(value)) {
            importDec.setModuleSpecifier(`@/${value}`);
        }
    });
});

// Обязательный параметр, чтобы ts-morph применил изменения
project.save();
