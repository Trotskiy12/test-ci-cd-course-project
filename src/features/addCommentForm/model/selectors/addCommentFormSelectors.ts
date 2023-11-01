import { StateSchema } from '@/app/providers/StoreProvider';

// Так как в input можно подставить 0 и ноль это falsy значение, поэтому для 0 подставится пустая строка
// Поэтому используем вместо || -> null оператор ??
export const getAddCommentFromText = (state: StateSchema) => state.addCommentForm?.text ?? '';
export const getAddCommentFromError = (state: StateSchema) => state.addCommentForm?.error || '';
