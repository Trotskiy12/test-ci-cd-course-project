import { FC, lazy } from 'react';
import { AddCommentFormProps } from './addCommentForm';

// Внутри LoginForm используется memo + в этой файле lazy с Promise
// Поэтому у нас потеряются типы пропсов для компонента
export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./addCommentForm')), 1500);
}));
