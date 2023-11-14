import { UserRole, getUserAuthData, getUserRoles } from '@/entities/User';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '@/shared/const/router';

interface RequireAuthProps {
    children: JSX.Element;
    roles?: UserRole[];
}

export function RequireAuth(props: RequireAuthProps) {
    const {
        children,
        roles,
    } = props;
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);

    // Проверка на права
    const hasRequiredRoles = useMemo(() => {
        // если по маршруту не передан массив необходимых прав на доступ
        // то вернём true - на страницу можно войти
        if (!roles) return true;
        // иначе делаем проверку на права, которые есть у пользователя
        // с теми правами, которые необходимы для досутпа к странице
        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole);
            return hasRole;
        });
    }, [roles, userRoles]);

    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    if (!hasRequiredRoles) {
        return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
    }

    return children;
}
