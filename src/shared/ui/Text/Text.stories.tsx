import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Text } from './Text';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { TextSize, TextTheme } from '@/shared/const/textConsts';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Test title',
    text: 'Test text',
};

export const onlyTitle = Template.bind({});
onlyTitle.args = {
    title: 'Test title',

};

export const onlyText = Template.bind({});
onlyText.args = {
    text: 'Test text',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'Test title',
    text: 'Test text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
export const onlyTitleDark = Template.bind({});
onlyTitleDark.args = {
    title: 'Test title',
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];
export const onlyTextDark = Template.bind({});
onlyTextDark.args = {
    text: 'Test text',
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];
export const Error = Template.bind({});
Error.args = {
    title: 'Test title',
    text: 'Test text',
    theme: TextTheme.ERROR,
};

export const SizeM = Template.bind({});
SizeM.args = {
    size: TextSize.M,
    title: 'Test title',
    text: 'Test text',
};

export const SizeL = Template.bind({});
SizeM.args = {
    size: TextSize.L,
    title: 'Test title',
    text: 'Test text',
};

export const SizeS = Template.bind({});
SizeS.args = {
    size: TextSize.S,
    title: 'Test title',
    text: 'Test text',
};
