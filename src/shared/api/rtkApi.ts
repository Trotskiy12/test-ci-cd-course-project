import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

// Define a service using a base URL and expected endpoints
export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: __API__,
            prepareHeaders: (headers) => {
                const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
                if (token) {
                    headers.set('Authorization', token);
                }
                return headers;
            },
        },
    ),
    // Если все endpoints приложения указывать здесь - то в дальнейшем их станет очень много
    // Поэтому хочется inject их асинхронно и лениво
    endpoints: () => ({}),
});
