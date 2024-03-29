// Record<key, value> -> объект с парами ключ-значение
export type Mods = Record<string, boolean | string | undefined>;

/*
 * ClassNames - функция для склеивания классов модов и так далее
 * @param cls - главный класс
 * @param mods - модификаторы (hovered)
 * @param additional - второстепенные классы
 */
export function classNames(cls: string, mods: Mods = {}, additional: Array<string | undefined> = []): string {
    return [
        cls,
        // Избавимся от undefined
        ...additional.filter(Boolean),
        // Получаем ключи и значения из объекта mods
        ...Object.entries(mods)
        // Оставим только те элементы, у которых value: true
            .filter(([_, value]) => Boolean(value))
        // В итоге вернём только названия классов
            .map(([className]) => className),
    ]
        .join(' ');
}
