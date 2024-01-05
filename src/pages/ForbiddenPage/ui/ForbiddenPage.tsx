/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';

import { Page } from '@/widgets/Page';

const ForbiddenPage = memo(() => {
    return (
        <Page
            data-testid="ForbiddenPage"
        >
            У вас недостаточно прав на просмотр данной страницы
        </Page>
    );
});

export default ForbiddenPage;
