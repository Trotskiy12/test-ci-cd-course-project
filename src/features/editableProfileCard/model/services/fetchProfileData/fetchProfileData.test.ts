import { Country } from '@/entities/Country';
import { fetchProfileData } from './fetchProfileData';
import { TestAsyncFunc } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Currency } from '@/entities/Currency';

const data = {
    username: 'admin',
    first: 'Daniil',
    lastname: 'Lustenko',
    age: 22,
    country: Country.Belarus,
    currency: Currency.RUB,
    city: 'Petrozavodsk',
};

describe('fetchProfileData', () => {
    test('success', async () => {
        const thunk = new TestAsyncFunc(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncFunc(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
