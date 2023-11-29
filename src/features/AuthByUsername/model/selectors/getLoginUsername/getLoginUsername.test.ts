import { getLoginUsername } from './getLoginUsername';

import { StateSchema } from '@/app/providers/StoreProvider';

describe('getLoginUsername', () => {
    test('should return username from state', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'testName',
            },
        };
        expect(getLoginUsername(state as StateSchema)).toEqual('testName');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginUsername(state as StateSchema)).toEqual('');
    });
});
