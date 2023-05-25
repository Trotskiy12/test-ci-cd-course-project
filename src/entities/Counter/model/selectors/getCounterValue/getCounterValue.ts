import { createSelector } from 'reselect';
import { getCounter } from '../getCounter/getCounter';
import { CounterSchema } from '../../types/counterSchema';
// createSelector - позволяет переиспользовать другие селекторы и мемоизировать их значения
export const getCounterValue = createSelector(
    getCounter,
    (counter: CounterSchema) => counter.value,
);
