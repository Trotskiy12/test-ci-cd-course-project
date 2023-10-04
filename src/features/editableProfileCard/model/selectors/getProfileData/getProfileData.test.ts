import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileData } from './getProfileData';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

describe('getProfileData', () => {
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
                data,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
        };
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
