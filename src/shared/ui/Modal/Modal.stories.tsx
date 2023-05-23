import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Modal } from './Modal';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Light = Template.bind({});
Light.args = {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae exercitationem aperiam numquam cupiditate repellat ad laboriosam, at impedit quis iste ratione et commodi nesciunt maiores mollitia expedita dolores quaerat repudiandae!',
};

export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae exercitationem aperiam numquam cupiditate repellat ad laboriosam, at impedit quis iste ratione et commodi nesciunt maiores mollitia expedita dolores quaerat repudiandae!',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
