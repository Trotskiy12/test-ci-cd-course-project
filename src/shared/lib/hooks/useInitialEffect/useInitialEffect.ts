import { useEffect } from 'react';

// хук должен отрабатывать лишь единожды,
// так что массив зависимостей должен остаться пустым
export function useInitialEffect(callback: () => void) {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            callback();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
