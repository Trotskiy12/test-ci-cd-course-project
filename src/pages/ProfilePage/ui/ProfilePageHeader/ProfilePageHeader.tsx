import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePageHeader.module.scss';
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
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('title')} />
            {canEdit && (
                <div className={cls.btnWrapper}>
                    {readonly ? (
                        <Button
                            theme={ThemeButton.OUTLINE}
                            className={cls.editBtn}
                            onClick={onEdit}
                        >
                            {t('edit')}
                        </Button>
                    ) : (
                        <>
                            <Button
                                theme={ThemeButton.OUTLINE_RED}
                                className={cls.editBtn}
                                onClick={onCancelEdit}
                            >
                                {t('cancel')}
                            </Button>
                            <Button
                                theme={ThemeButton.OUTLINE}
                                className={cls.saveBtn}
                                onClick={onSave}
                            >
                                {t('save')}
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
