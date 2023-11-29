import { ValidateProfileError } from '../consts/consts';

import { Profile } from '@/entities/Profile';

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
