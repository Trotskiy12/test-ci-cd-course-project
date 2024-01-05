/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';

import { Page } from '@/widgets/Page';

const AdminPanelPage = memo(() => {
    return (
        <Page
            data-testid="AdminPanelPage"
        >
            Панель администратора
        </Page>
    );
});

export default AdminPanelPage;
