/* eslint-disable i18next/no-literal-string */
/* eslint-disable react/jsx-no-undef */
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { PAGE_ID } from 'widgets/Page/Page';

interface ArticleListProps {
    className?: string;
    // не привязываем компонент к какому-то state
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    virtualized?: boolean;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3).fill(0).map((item, index) => (
    <ArticleListItemSkeleton key={index} view={view} className={cls.card} />
));

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        target,
        view = ArticleView.SMALL,
        virtualized = true
    } = props;

    const isBig = view === ArticleView.BIG;
    const itemsPerRow = isBig ? 1 : 3;
    const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);

    const rowRender = ({
        index, key, style,
    }: ListRowProps) => {
        const items = [];
        const fromIndex = index * itemsPerRow;
        // берем минимальное между двумя числами, чтобы не выйти за переделы массива
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

        for (let i = fromIndex; i < toIndex; i += 1) {
            items.push(
                <ArticleListItem
                    article={articles[i]}
                    view={view}
                    className={cls.card}
                    target={target}
                    key={`str${i}`}
                />,
            );
        }

        return (
            <div
                key={key}
                style={style}
                className={cls.row}
            >
                {items}
            </div>
        );
    };

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text size={TextSize.L} title="Статьи не найдены" />
            </div>
        );
    }
    // TODO: Мигрировать с react-virtualized на более актуальную библиотеку (react-window | react-virtuoso)
    return (
        <WindowScroller
            scrollElement={document.getElementById(PAGE_ID) as Element}
        >
            {({
                height, width, registerChild, scrollTop, onChildScroll,
            }) => (
                // @ts-ignore
                <div ref={registerChild} className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                    {virtualized ? (
                        <List
                            autoHeight
                            height={height ?? 700}
                            rowCount={rowCount}
                            rowHeight={isBig ? 700 : 330}
                            rowRenderer={rowRender}
                            width={width ? width - 80 : 700}
                            onScroll={onChildScroll}
                            scrollTop={scrollTop}
                        />) : (
                        articles.map(item => (
                            <ArticleListItem
                                article={item}
                                view={view}
                                className={cls.card}
                                target={target}
                                key={item.id}
                            />
                        ))
                    )
                    }
                    {isLoading && getSkeletons(view)}
                </div>
            )}
        </WindowScroller>
    );
});
