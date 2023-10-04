import { Profile } from 'entities/Profile';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';
// TODO: Доделать валидацию по всем полям
// TODO: После завершения курса переписать с помощью react-hook-form и yup validate-schema
export const validateProfileData = (profile?: Profile): ValidateProfileError[] => {
    if (!profile) return [ValidateProfileError.NO_DATA];
    const {
        first, lastname, age, country,
    } = profile;

    const errors: ValidateProfileError[] = [];

    if (!first || !lastname) errors.push(ValidateProfileError.INCORRECT_USER_DATA);

    if (!age || !Number.isInteger(age)) errors.push(ValidateProfileError.INCORRECT_AGE);

    if (!country) errors.push(ValidateProfileError.INCORRECT_COUNTRY);

    return errors;
};
