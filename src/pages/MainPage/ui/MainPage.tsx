/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';

import { RatingCard } from '@/entities/Rating';
import { Page } from '@/widgets/Page';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            {t('main-page')}
            <RatingCard
                title="Как вам статья?"
                feedbackTitle="Оставьте отзыв о статье"
                hasFeedback
            />
        </Page>
    );
};

export default MainPage;
