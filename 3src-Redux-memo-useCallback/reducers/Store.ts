import {todoListsReducer} from './todoListsReducer';
import {tasksReducer} from './tasksReducer';
import {combineReducers, legacy_createStore} from 'redux';


const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
})

export type AppStoreType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)

//@ts-ignore
window.store = store