/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
    // getAddCommentFromError,
    getAddCommentFromText,
} from '../../model/selectors/addCommentFormSelectors';
import { addCommentFormSliceActions, addCommentFormSliceReducer } from '../../model/slices/addCommentFromSlice';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispacth } from '@/shared/lib/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';

import cls from './addCommentForm.module.scss';

export interface AddCommentFormProps {
    className?: string;
    // делегировали отправку коммента внешней сущности
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormSliceReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const text = useSelector(getAddCommentFromText);
    // const error = useSelector(getAddCommentFromError);

    const dispatch = useAppDispacth();
    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormSliceActions.setText(value || ''));
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        dispatch(addCommentFormSliceActions.setText(''));
    }, [dispatch, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <HStack justify="between" max className={classNames(cls.addCommentForm, {}, [className])}>
                <Input
                    type="text"
                    className={cls.input}
                    placeholder="Введите текст комментария"
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button
                    onClick={onSendHandler}
                >
                    Отправить

                </Button>
            </HStack>
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
