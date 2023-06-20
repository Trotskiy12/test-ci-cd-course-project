import { lazy } from 'react';

export const ArticleAsyncPage = lazy(async () => import('./ArticlePage'));
