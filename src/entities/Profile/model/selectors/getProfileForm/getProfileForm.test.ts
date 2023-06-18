import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

describe('getProfileForm', () => {
    test('should return error', () => {
        const data = {
            username: 'admin',
            first: 'Daniil',
            lastname: 'Lustenko',
            age: 22,
            country: Country.Belarus,
            currency: Currency.RUB,
            city: 'Petrozavodsk',
        };
        const state: DeepPartial<StateSchema> = {
            profile: {
                form: data,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
        };
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
