// Record<key, value> -> объект с парами ключ-значение
type Mods = Record<string, boolean | string>;

/*
 * classNames - функция для склеивания классов модов и так далее
 * @param cls - главный класс
 * @param mods - модификаторы (hovered)
 * @param additional - второстепенные классы
 */
export function classNames (cls: string, mods: Mods = {}, additional: string[] = []): string {
    return [
        cls,
        // избавимся от undefined
        ...additional.filter(Boolean),
        // получаем ключи и значения из объекта mods
        Object.entries(mods)
            // оставим только те элементы, у которых value: true
            .filter(([className, value]) => Boolean(value))
            // в итоге вернём только названия классов 
            .map(([className, value]) => className)
    ]
        .join(' ')
}