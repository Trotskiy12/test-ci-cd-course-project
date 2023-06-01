// интерефейса для state, который отвечает за форму авторизации
export interface LoginSchema {
    username: string;
    password: string;
    isLoading: boolean;
    error?: string;
}
