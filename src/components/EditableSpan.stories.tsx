import {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import { EditableSpan } from './EditableSpan';
import { useState } from 'react';
import React from 'react';
import { StoriesProviderDecorator } from './StoriesProviderDecorator';

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'EditableSpan',
    component: EditableSpan,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    decorators: [StoriesProviderDecorator],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        // value: {
        //     description: 'Start value empty. Add value push button set string.'
        // },
        // onChange: {
        //     description: 'Value EditableSpan changed'
        // }
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;
// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const EditableSpanStory: Story = {
    args: {
        oldTitle: 'oldTitle',
        callBack: action('Value EditableSpan changed')
    }
};

export const EditableSpanStoryReturn = () => {
    const [newTitle, setNewTitle] = useState('oldTitle')
    return <EditableSpan oldTitle={newTitle} callBack={setNewTitle}/>
}
