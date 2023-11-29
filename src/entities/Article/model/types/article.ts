import { ArticleBlockType, ArticleType } from '../consts/articleConsts';

import { User } from '@/entities/User';

// Родительский блок, так как статьи имеют одинаковые поля указанные ниже
export interface ArticleBlockBase {
    id: string;
    type: ArticleBlockType;
}

// Расширяем интерфейс
export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleBlockType.CODE;
    code: string;
}
// Расширяем интерфейс
export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleBlockType.IMAGE;
    src: string;
    title: string;
}
// Расширяем интерфейс
export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleBlockType.TEXT;
    title?: string;
    paragraphs: string[];
}

// UNION TYPE где указываем, что блок может быть один из трех перечисленных
export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export interface Article {
    id: string;
    title: string;
    user: User;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    // Типов может быть несколько
    type: ArticleType[];
    // блоков внутри статьи может быть несколько
    blocks: ArticleBlock[];
}
