import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

// Внутри LoginForm используется memo + в этой файле lazy с Promise
// Поэтому у нас потеряются типы пропсов для компонента
export const LoginFromAsync = lazy<FC<LoginFormProps>>(() => import('./LoginForm'));
