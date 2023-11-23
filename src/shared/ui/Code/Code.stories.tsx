import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Code } from './Code';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    text: 'export default {\n'
    + '    title: \'shared/Code\',\n'
    + '    component: Code,\n'
    + '    argTypes: {\n'
    + '        backgroundColor: { control: \'color\' },\n'
    + '    },\n'
    + '} as ComponentMeta<typeof Code>;\n'
    + '\n'
    + 'const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n'
    + '\n'
    + 'export const Normal = Template.bind({});',
};

export const NormalOrange = Template.bind({});
NormalOrange.args = {
    text: 'export default {\n'
    + '    title: \'shared/Code\',\n'
    + '    component: Code,\n'
    + '    argTypes: {\n'
    + '        backgroundColor: { control: \'color\' },\n'
    + '    },\n'
    + '} as ComponentMeta<typeof Code>;\n'
    + '\n'
    + 'const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n'
    + '\n'
    + 'export const Normal = Template.bind({});',
};

NormalOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

export const NormalDark = Template.bind({});
NormalDark.args = {
    text: 'export default {\n'
    + '    title: \'shared/Code\',\n'
    + '    component: Code,\n'
    + '    argTypes: {\n'
    + '        backgroundColor: { control: \'color\' },\n'
    + '    },\n'
    + '} as ComponentMeta<typeof Code>;\n'
    + '\n'
    + 'const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n'
    + '\n'
    + 'export const Normal = Template.bind({});',
};

NormalDark.decorators = [ThemeDecorator(Theme.DARK)];
