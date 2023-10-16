import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotificationButton.module.scss';
import { NotificationList } from 'entities/Notification';
import { ThemeButton } from 'shared/const/buttonConsts';
import { Button } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Popover } from 'shared/ui/Popups';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;

    return (
        <Popover
            className={classNames(cls.NotificationButton, {}, [className])}
            direction="bottom left"
            trigger={(
                <Button theme={ThemeButton.CLEAR}>
                    <Icon Svg={EyeIcon} inverted />
                </Button>
            )}
        >
            <NotificationList className={cls.notifications} />
        </Popover>
    );
});
