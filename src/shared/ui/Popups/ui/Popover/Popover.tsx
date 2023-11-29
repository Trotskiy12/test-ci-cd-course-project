import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';

import { mapDirectionClass } from '../../styles/const';
import popupCls from '../../styles/popup.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';

import cls from './Popover.module.scss';

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
            <HPopover.Button as="div" className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel className={classNames(cls.panel, {}, optionClasses)}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
}
