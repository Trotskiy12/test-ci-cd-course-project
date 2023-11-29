import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import withMock from 'storybook-addon-mock';

import { NotificationList } from './NotificationList';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'entities/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator({})];
Normal.args = {};
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                {
                    title: 'Уведомление 1',
                    description: 'Описание 1',
                    id: '1',
                },
                {
                    title: 'Уведомление 2',
                    description: 'Описание 2',
                    id: '2',
                },
                {
                    title: 'Уведомление 2',
                    description: 'Описание 2',
                    id: '3',
                },
            ],
        },
    ],
};

export const NormalWithDelay = Template.bind({});
NormalWithDelay.decorators = [StoreDecorator({})];
NormalWithDelay.args = {};
NormalWithDelay.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                {
                    title: 'Уведомление 1',
                    description: 'Описание 1',
                    id: '1',
                },
                {
                    title: 'Уведомление 2',
                    description: 'Описание 2',
                    id: '2',
                },
                {
                    title: 'Уведомление 2',
                    description: 'Описание 2',
                    id: '3',
                },
            ],
            delay: 2000,
        },
    ],
};

export const NotificationWithHref = Template.bind({});
NotificationWithHref.decorators = [StoreDecorator({})];
NotificationWithHref.args = {};
NotificationWithHref.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                {
                    title: 'Уведомление с ссылкой',
                    description: 'Описание (наведи на меня)',
                    id: '1',
                    href: '/test',
                },
            ],
        },
    ],
};
