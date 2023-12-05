import { buildSelector } from '@/shared/lib/store';
// createSelector - позволяет переиспользовать другие селекторы и мемоизировать их значения
// export const getCounterValue = createSelector(
//     getCounter,
//     (counter: CounterSchema) => counter.value,
// );

export const [useCounterValue, getCounterValue] = buildSelector((state) => state.counter.value);
