import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    getProfileData, getProfileReadonly, profileActions, updateProfileData,
} from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispacth } from 'shared/lib/hooks/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import { HStack } from 'shared/ui/Stack/HStack/HStack';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
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
                <>
                    {readonly ? (
                        <Button
                            theme={ThemeButton.OUTLINE}
                            
                            onClick={onEdit}
                        >
                            {t('edit')}
                        </Button>
                    ) : (
                        <HStack gap='8'>
                            <Button
                                theme={ThemeButton.OUTLINE_RED}
                               
                                onClick={onCancelEdit}
                            >
                                {t('cancel')}
                            </Button>
                            <Button
                                theme={ThemeButton.OUTLINE}
                                onClick={onSave}
                            >
                                {t('save')}
                            </Button>
                        </HStack>
                    )}
                </>
            )}
        </HStack>
    );
};
