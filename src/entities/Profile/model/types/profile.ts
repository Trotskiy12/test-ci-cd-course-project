import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency/model/types/currency';

// enum для ошибок
export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR'
}

export interface Profile {
    first?: string,
    lastname?: string,
    age?: number,
    currency?: Currency,
    country?: Country,
    city?: string,
    username?: string,
    avatar?: string
}

export interface ProfileSchema {
    // то, что пришло с сервера
    data?: Profile,
    // то, что наизменял сам пользователь
    form?: Profile
    isLoading: boolean,
    error?: string,
    readonly: boolean,
    // ошибок может быть несколько - так что это поле массив
    validateError?: ValidateProfileError[];
}
