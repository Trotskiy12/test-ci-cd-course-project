import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card } from './Card';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'app/providers/ThemeProvider';
import { Text } from '../Text/Text';

export default {
    title: 'shared/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    children: <Text title="test" text="text test" />,
};

// export const NormalOrange = Template.bind({});
// NormalOrange.args = {
// };
// NormalOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

// export const NormalDark = Template.bind({});
// NormalDark.args = {
// };

// NormalDark.decorators = [ThemeDecorator(Theme.DARK)];
