import { memo } from 'react';
import { Page } from 'widgets/Page/Page';

interface AdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
    return (
        <Page>
            {'Панель администратора'}
        </Page>
    );
})

export default AdminPanelPage;