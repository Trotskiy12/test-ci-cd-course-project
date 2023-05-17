import { classNames } from 'shared/lib/classNames/classNames';

describe('classNames', () => {
    test('with first param', () => {
        expect(classNames('className')).toBe('className');
    });
    test('with additional class', () => {
        const expected = 'className class1 class2';
        expect(classNames('className', {}, ['class1', 'class2'])).toBe(expected);
    });
    test('with mods', () => {
        const expected = 'className class1 class2 hovered scrollable';
        expect(classNames(
            'className',
            { hovered: true, scrollable: true },
            ['class1', 'class2'],
        )).toBe(expected);
    });
    test('with mods false', () => {
        const expected = 'className class1 class2 hovered';
        expect(classNames(
            'className',
            { hovered: true, scrollable: false },
            ['class1', 'class2'],
        )).toBe(expected);
    });
    test('with mods undefined', () => {
        const expected = 'className class1 class2 hovered';
        expect(classNames(
            'className',
            { hovered: true, scrollable: undefined },
            ['class1', 'class2'],
        )).toBe(expected);
    });
});
