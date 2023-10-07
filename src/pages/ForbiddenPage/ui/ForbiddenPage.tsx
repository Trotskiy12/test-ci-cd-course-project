import { memo } from 'react';
import { Page } from 'widgets/Page/Page';

const ForbiddenPage = memo(() => {
    return (
        <Page>
            У вас недостаточно прав на просмотр данной страницы
        </Page>
    );
});

export default ForbiddenPage;
