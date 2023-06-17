import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency/model/types/currency';

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
    readonly: boolean
}
