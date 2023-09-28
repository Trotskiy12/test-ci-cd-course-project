// импортируем шаблон
const createTemplate = require('./templates/createTemplate');
// получаем название слоя
const layer = process.argv[2];
// получаем названия слайса
const sliceName = process.argv[3];

// слои по FSD
const layers = ['features', 'entities', 'pages'];

// Если не указан слой или его нет в слоях FSD
if (!layer || !layers.includes(layer)) {
    throw new Error(`Укажите слой ${layers.join(' или ')}`);
}
// Если не указан слайс
if (!sliceName) {
    throw new Error('Укажите название слайса');
}
// Вызов с переданными слоем и слайсом
createTemplate(layer, sliceName);
