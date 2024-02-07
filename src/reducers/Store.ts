import {todoListsReducer} from './todoListsReducer';
import {tasksReducer} from './tasksReducer';
import {combineReducers, createStore} from 'redux';


const rootReduser = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
})

export type AppStoreType = ReturnType<typeof rootReduser>

export const store = createStore(rootReduser)

//@ts-ignore
window.store = store