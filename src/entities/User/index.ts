// userReducer необходимо будет добавить в rootReducer
// userActions понадобятся для работы с данными
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { userReducer, userActions } from './model/slice/userSlice';
export { User, UserSchema } from './model/types/user';
