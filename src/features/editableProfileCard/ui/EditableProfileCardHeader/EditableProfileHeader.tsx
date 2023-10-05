import { getUserAuthData } from 'entities/User';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispacth } from 'shared/lib/hooks/useAppDispatch';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = (props: EditableProfileCardHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('profile');
    // TODO: Переделать через отдельный selector с использованием reselect
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const readonly = useSelector(getProfileReadonly);
    const dispacth = useAppDispacth();
    const onEdit = useCallback(() => {
        dispacth(profileActions.setReadonly(false));
    }, [dispacth]);

    const onCancelEdit = useCallback(() => {
        dispacth(profileActions.cancelEdit());
    }, [dispacth]);

    const onSave = useCallback(() => {
        dispacth(updateProfileData());
    }, [dispacth]);

    return (
        <HStack justify="between" max className={classNames('', {}, [className])}>
            <Text title={t('title')} />
            {canEdit && (
                <div>
                    {readonly ? (
                        <Button
                            theme={ThemeButton.OUTLINE}
                            onClick={onEdit}
                            data-testid={'EditableProfileCardHeader.EditButton'}
                        >
                            {t('edit')}
                        </Button>
                    ) : (
                        <HStack gap="8">
                            <Button
                                theme={ThemeButton.OUTLINE_RED}
                                onClick={onCancelEdit}
                                data-testid={'EditableProfileCardHeader.CancelButton'}
                            >
                                {t('cancel')}
                            </Button>
                            <Button
                                theme={ThemeButton.OUTLINE}
                                onClick={onSave}
                                data-testid={'EditableProfileCardHeader.SaveButton'}
                            >
                                {t('save')}
                            </Button>
                        </HStack>
                    )}
                </div>
            )}
        </HStack>
    );
};
