import React from 'react'
import {Task} from './Task';
import {AppStoreType, StoriesProviderDecorator} from '../../stories/StoriesProviderDecorator';
import { useSelector } from 'react-redux';
import { TaskType } from '../../reducers/tasksReducer';
import { v1 } from 'uuid';
import {Meta} from '@storybook/react'

const meta: Meta<typeof Task> = {
    title: 'Task component',
    component: Task,
    decorators: [StoriesProviderDecorator],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
    }
}

export default meta;

const HelpComponent = () => {
    let task = useSelector<AppStoreType, TaskType>(state => state.tasks['todolistId1'][0])
    if(!task){task = {id: v1(), title: 'DefaultTask', isDone: false}}

    return(
        <Task task={task} todolistId='todolistId1'/>
    )

}

export const TaskExample = () => {

    return <HelpComponent/>

}