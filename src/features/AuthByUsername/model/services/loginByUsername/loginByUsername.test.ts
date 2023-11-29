import { loginByUsername } from './loginByUsername';

import { userActions } from '@/entities/User';
import { TestAsyncFunc } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

describe('loginByUsername', () => {
    // // объявление типов для переменных
    // let dispatch: Dispatch;
    // let getState: () => StateSchema;
    // // мокаем эти переменные для каждого теста
    // beforeEach(() => {
    //     dispatch = jest.fn();
    //     getState = jest.fn();
    // });

    // test('success auth', async () => {
    //     const userValue = { username: '123', id: '1' };
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
    //     const action = loginByUsername({ username: '123', password: '123' });
    //     // action это AsyncThunk
    //     const result = await action(dispatch, getState, undefined);
    //     // проверка, что dispacth был вызван
    //     // именно здесь: проверка, был ли вызван action setAuthData
    //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    //     expect(dispatch).toHaveBeenCalledTimes(3);
    //     // проверка, что post отработал
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     // проверить, что action отработал
    //     expect(result.meta.requestStatus).toBe('fulfilled');
    //     // проверка,что в payload
    //     expect(result.payload).toEqual(userValue);
    // });

    // test('error auth', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
    //     const action = loginByUsername({ username: '123', password: '123' });
    //     // action это AsyncThunk
    //     const result = await action(dispatch, getState, undefined);
    //     // проверка, сколько раз вызвался dispatch
    //     expect(dispatch).toHaveBeenCalledTimes(2);
    //     // проверка, что post отработал
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     // проверить, что action отработал
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     // проверка,что в payload
    //     expect(result.payload).toBe('error');
    // });

    test('success auth', async () => {
        const userValue = { username: '123', id: '1' };

        const thunk = new TestAsyncFunc(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);
    });

    test('error auth', async () => {
        const thunk = new TestAsyncFunc(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk({ username: '123', password: '123' });
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
