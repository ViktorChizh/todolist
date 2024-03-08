import React from 'react'
import {Task} from './Task';
import {AppStoreType, StoriesProviderDecorator} from '../../../../app_and_store/StoriesProviderDecorator';
import {useSelector} from 'react-redux';
import {v1} from 'uuid';
import {Meta} from '@storybook/react'
import {TaskType} from '../../../../api/todolists-api';

const meta: Meta<typeof Task> = {
    title: 'Task component',
    component: Task,
    decorators: [StoriesProviderDecorator],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
}

export default meta;

const HelpComponent = () => {
    let task = useSelector<AppStoreType, TaskType>(state => state.tasks['todolistId1'][0])
    if (!task) {
        task = {
            id: v1(), title: 'DefaultTask', status: 0, order: 0,
            addedDate: new Date(), startDate: null, todoListId: 'newTodolistId',
            priority: 1, description: '', deadline: null
        }
    }

    return (
        <Task task={task} todolistId="todolistId1"/>
    )

}

export const TaskExample = () => {

    return <HelpComponent/>

}