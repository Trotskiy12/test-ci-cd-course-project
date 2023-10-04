import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArtcileRecommendationsList } from './ArtcileRecommendationsList';

export default {
    title: 'features/ArtcileRecommendationsList',
    component: ArtcileRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArtcileRecommendationsList>;

const Template: ComponentStory<typeof ArtcileRecommendationsList> = (args) => <ArtcileRecommendationsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
