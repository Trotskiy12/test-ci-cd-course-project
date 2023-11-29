import { EntityState } from '@reduxjs/toolkit';

import {
    Article, ArticleView, ArticleSortField, ArticleType,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types';

export interface ArticlePageSchema extends EntityState<Article>{
    isLoading?: boolean;
    error?: string;

    page: number;
    limit: number;
    hasMore: boolean;

    // filters
    view: ArticleView;
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    type: ArticleType;

    // Не изменяемый флаг - "_" - руками менять нельзя
    _inited: boolean; // проверка - инициализированный state или нет
}
