import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { profileActions, profileReducer } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCardSchema';
import { ValidateProfileError } from '../consts/consts';

const data = {
    username: 'admin',
    first: 'Daniil',
    lastname: 'Lustenko',
    age: 22,
    country: Country.Belarus,
    currency: Currency.RUB,
    city: 'Petrozavodsk',
};

describe('profileSlice', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadonly(true),
        ))
            .toEqual({ readonly: true });
    });
    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = { data };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit(),
        ))
            .toEqual({
                readonly: true,
                validateError: undefined,
                data,
                form: data,
            });
    });

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = { form: { username: '123' } };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.updateProfile({
                username: '1234',
            }),
        ))
            .toEqual({
                form: { username: '1234' },
            });
    });

    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = { isLoading: false, validateError: [ValidateProfileError.SERVER_ERROR] };
        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending,
        ))
            .toEqual({
                isLoading: true,
                validateError: undefined,
            });
    });

    test('test update profile service fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };
        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(data, ''),
        ))
            .toEqual({
                isLoading: false,
                validateError: undefined,
                readonly: true,
                validateErrors: undefined,
                form: data,
                data,
            });
    });
});
