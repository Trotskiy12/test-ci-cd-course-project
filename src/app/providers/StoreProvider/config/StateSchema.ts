import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    // в дальшем сделаем loginForm необязательным, так как он будет асинхронным
    loginForm: LoginSchema
}
