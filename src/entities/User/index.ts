// userReducer необходимо будет добавить в rootReducer
// userActions понадобятся для работы с данными
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';
export { userReducer, userActions } from './model/slice/userSlice';
export { User, UserSchema, UserRole } from './model/types/user';
export { isUserAdmin, isUserManager, getUserRoles }  from './model/selectors/roleSelectors/roleSelectors';
