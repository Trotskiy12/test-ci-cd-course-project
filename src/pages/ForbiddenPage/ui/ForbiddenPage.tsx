import { memo } from 'react';
import { Page } from 'widgets/Page/Page';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = memo((props: ForbiddenPageProps) => {
    return (
        <Page>
            {'У вас недостаточно прав на просмотр данной страницы'}
        </Page>
    );
})

export default ForbiddenPage;