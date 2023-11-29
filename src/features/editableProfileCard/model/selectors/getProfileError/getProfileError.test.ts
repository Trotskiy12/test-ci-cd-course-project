import { getProfileError } from './getProfileError';

import { StateSchema } from '@/app/providers/StoreProvider';

describe('getProfileError', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: 'true',
            },
        };
        expect(getProfileError(state as StateSchema)).toEqual('true');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {
        };
        expect(getProfileError(state as StateSchema)).toEqual('');
    });
});
