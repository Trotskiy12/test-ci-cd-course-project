/* eslint-disable i18next/no-literal-string */
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleSortSelector.module.scss';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { useMemo } from 'react';
import { ArticleSortField } from '../../model/types/article';
import { SortOrder } from 'shared/types';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newOrder: ArticleSortField) => void;
}

export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
    const {
        className,
        sort,
        order,
        onChangeOrder,
        onChangeSort,
    } = props;

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: 'возрастанию',
        },
        {
            value: 'desc',
            content: 'убыванию',
        },
    ], []);

    const sortFieldOption = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: 'дате создания',
        },
        {
            value: ArticleSortField.TITLE,
            content: 'названию',
        },
        {
            value: ArticleSortField.VIEWS,
            content: 'просмотрам',
        },
    ], []);

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            {/* onChnage ожидает на вход строку - а мы передаем ArticleSortField
                Компонент Select ничего не знает про это и требует от нас строку
                Решение: Generic компоненты
            */}
            <Select<ArticleSortField>
                options={sortFieldOption}
                label="Сортировать ПО"
                value={sort}
                onChange={onChangeSort}
            />
            <Select<SortOrder>
                options={orderOptions}
                label="по"
                value={order}
                onChange={onChangeOrder}
                className={cls.order}
            />
        </div>
    );
};
