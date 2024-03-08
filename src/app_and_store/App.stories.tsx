import React from 'react'
import {StoriesProviderDecorator} from './StoriesProviderDecorator'
import {Meta} from '@storybook/react'
import {App} from './App'

const meta: Meta<typeof App> = {
    title: 'App component',
    component: App,
    decorators: [StoriesProviderDecorator],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
}

export default meta;

export const AppExample = () => <App />