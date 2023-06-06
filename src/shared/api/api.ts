import { LOCAL_STORAGE_THEME_KEY } from 'app/providers/ThemeProvider/lib/ThemeContext';
import axios from 'axios';

export const $api = axios.create({
    // eslint-disable-next-line no-undef
    baseURL: __API__,
    headers: {
        authorization: localStorage.getItem(LOCAL_STORAGE_THEME_KEY),
    },
});
