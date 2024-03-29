import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';

import { StateSchema } from '@/app/providers/StoreProvider';

jest.mock('axios');
// так как TS не подхватывает функции для замоканного axios
// нужно воспользоваться функцией mocked()
// deep: true, чтобы подхватывались поля
const mockedAxios = jest.mocked(axios, true);

// eslint-disable-next-line max-len
type ActionCreatorType<Return, Arg, RejectedValue>
    = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue}>;

// Класс, предназначен для изолироания логики для тестирования AsyncThunk
export class TestAsyncFunc<Return, Arg, RejectedValue> {
    dispatch: jest.MockedFn<any>;

    getState: () => StateSchema;

    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

    api: jest.MockedFunctionDeep<AxiosStatic>;

    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>, state?: DeepPartial<StateSchema>) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn(() => state as StateSchema);
        this.api = mockedAxios;
    }

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg);
        // action это AsyncThunk
        const result = await action(this.dispatch, this.getState, { api: this.api });

        return result;
    }
}
