import {Provider} from 'react-redux';
import React from 'react';
import {todoListsReducer} from '../features/pageTodolists/todolist/TodoListsReducer';
import {tasksReducer} from '../features/pageTodolists/todolist/task/TasksReducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {v1} from 'uuid';
import {appReducer} from './AppReducer';
import {thunk} from 'redux-thunk';
import {AppStoreType} from './Store';

const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer
})

const initialState: AppStoreType = {
    app:  {
        status: 'idle',
        error: null
    },
    todolists: [
        {
            id: 'todolistId1', title: 'What to learn',
            addedDate: new Date(), order: 0,
            filter: 'all', todoStatus: 'idle'
        },
        {
            id: 'todolistId2', title: 'What to buy',
            addedDate: new Date(), order: 0,
            filter: 'all', todoStatus: 'idle'
        }
    ],
    tasks: {
        'todolistId1': [
            {
                id: v1(), todoListId: 'todolistId1', title: 'HTML&CSS', status: 1,
                addedDate: new Date(), order: 0, startDate: null, deadline: null,
                description: '', priority: 0
            },
            {
                id: v1(), todoListId: 'todolistId1', title: 'JS', status: 1,
                addedDate: new Date(), order: 0, startDate: null, deadline: null,
                description: '', priority: 0
            }
        ],
        'todolistId2': [
            {
                id: v1(), todoListId: 'todolistId2', title: 'Milk', status: 1,
                addedDate: new Date(), order: 0, startDate: null, deadline: null,
                description: '', priority: 0
            },
            {
                id: v1(), todoListId: 'todolistId2', title: 'React Book', status: 0,
                addedDate: new Date(), order: 0, startDate: null, deadline: null,
                description: '', priority: 0
            }
        ]
    }
}

let storeStorebook = legacy_createStore(rootReducer, initialState, applyMiddleware(thunk))

export const StoriesProviderDecorator = (story: any) => {
    return (
        <Provider store={storeStorebook}>
            {story()}
        </Provider>
    )
}