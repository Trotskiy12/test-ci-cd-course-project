import { useSelector } from 'react-redux';

import { StateSchema } from '@/app/providers/StoreProvider';

type Selector<T> = (state: StateSchema) => T;
type Result<T> = [() => T, Selector<T>];

export function buildSelector<T>(selector: Selector<T>): Result<T> {
    const useSelectorHook = () => {
        return useSelector(selector);
    };

    // TODO: Reselect
    // Если прилетает selector одним аргументом - просто возвращаем
    // Если несколько selectors - оборачивать в reselect - и возвращать уже ее

    return [useSelectorHook, selector];
}
