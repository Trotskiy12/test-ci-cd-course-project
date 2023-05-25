import { Counter } from 'entities/Counter';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
    const { t } = useTranslation('');
    return (
        <div>
            {t('about-page')}
            <Counter />

        </div>
    );
};

export default AboutPage;
