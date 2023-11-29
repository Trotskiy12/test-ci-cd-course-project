/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { Page } from '../../../../widgets/Page/ui/Page/Page';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;
    const { id } = useParams<{id: string}>();
    const isEdit = Boolean(id);
    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            {isEdit ? `редактирование статьие с id = ${id}` : 'Создание новое статьи'}
        </Page>
    );
});

export default ArticleEditPage;
