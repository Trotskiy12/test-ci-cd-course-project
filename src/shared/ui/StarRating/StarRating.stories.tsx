import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StarRating } from './StarRating';

export default {
    title: 'shared/StarRating',
    component: StarRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => <StarRating {...args} />;

export const WithStars = Template.bind({});
WithStars.args = {
    selectedStars: 5,
};

export const WithoutStars = Template.bind({});
WithoutStars.args = {
    selectedStars: 0,
};

export const WithFixedSize = Template.bind({});
WithFixedSize.args = {
    size: 50,
};
