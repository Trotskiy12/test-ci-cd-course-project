import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

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
