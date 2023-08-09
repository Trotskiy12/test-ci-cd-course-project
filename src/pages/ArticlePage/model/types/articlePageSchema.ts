import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';

export interface ArticlePageSchema extends EntityState<Article>{
    isLoading?: boolean;
    error?: string;
    view: ArticleView;

    page: number;
    limit?: number;
    hasMore: boolean;

    // Не изменяемый флаг - "_" - руками менять нельзя
    _inited: boolean; // проверка - инициализированный state или нет
}
