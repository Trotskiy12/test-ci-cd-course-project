import { createSelector } from 'reselect';

import { CounterSchema } from '../../types/counterSchema';
import { getCounter } from '../getCounter/getCounter';
// createSelector - позволяет переиспользовать другие селекторы и мемоизировать их значения
export const getCounterValue = createSelector(
    getCounter,
    (counter: CounterSchema) => counter.value,
);
