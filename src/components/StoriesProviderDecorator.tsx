import {Provider} from 'react-redux';
import React from 'react';
import {todoListsReducer} from '../reducers/todoListsReducer';
import {tasksReducer} from '../reducers/tasksReducer';
import {combineReducers, legacy_createStore} from 'redux';
import { v1 } from 'uuid';
// import {v1} from 'uuid';

const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
})

export type AppStoreType = ReturnType<typeof rootReducer>

const initialState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
            'todolistId1': [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true}
            ],
            'todolistId2': [
                {id: v1(), title: 'Milk', isDone: true},
                {id: v1(), title: 'React Book', isDone: false}
            ]
        }
}

let storeStorebook = legacy_createStore(rootReducer, initialState as AppStoreType & undefined)

export const StoriesProviderDecorator = (story: any) => {
   return (
        <Provider store={storeStorebook}>
            {story()}
        </Provider>
    )
}