import { useTranslation } from 'react-i18next';

import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

import { Button } from '@/shared/ui/Button';

export const Counter = () => {
    // используем хук
    const counterValue = useCounterValue();
    const { t } = useTranslation();
    const { add, decrement, increment } = useCounterActions();

    const handleIncrement = () => {
        // dispatch(counterActions.increment());
        increment();
    };

    const handleDecrement = () => {
        // dispatch(counterActions.decrement());
        decrement();
    };

    const handleAddTen = () => {
        add(10);
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button
                onClick={handleIncrement}
                data-testid="increment-btn"
            >
                {t('increment')}
            </Button>
            <Button
                data-testid="decrement-btn"
                onClick={handleDecrement}
            >
                {t('decrement')}
            </Button>
            <Button
                data-testid="decrement-btn-ten"
                onClick={handleAddTen}
            >
                {t('decrement')}
            </Button>
        </div>
    );
};
