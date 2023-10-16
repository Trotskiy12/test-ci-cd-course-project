import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Popover.module.scss';
import { DropDownDirection } from 'shared/types/ui';
import { mapDirectionClass } from '../../styles/const';
import popupCls from '../../styles/popup.module.scss';

interface PopoverProps {
    className?: string;
    trigger: ReactNode;
    direction?: DropDownDirection;
    children: ReactNode;
}

export function Popover(props: PopoverProps) {
    const {
        className, direction = 'bottom left', trigger, children,
    } = props;

    const optionClasses = [mapDirectionClass[direction]];

    return (
        <HPopover className={classNames(cls.Popover, {}, [className, popupCls.popup])}>
            <HPopover.Button className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel className={classNames(cls.panel, {}, optionClasses)}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
}
