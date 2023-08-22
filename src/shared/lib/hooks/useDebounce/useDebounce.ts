import { MutableRefObject, useCallback, useRef } from 'react';

// useDebounse - отменяет какое-то событие в течение заданого времени
// До тех пор пока (например) мы вводим что-то в инпут - callback вызываться не будет
export function useDebounse(callback: (...args: any[]) => void, delay: number) {
    const timer = useRef() as MutableRefObject<any>;
    return useCallback((...args: any[]) => {
        // если в timet уже сохранён timeout - очищаем его
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
}
