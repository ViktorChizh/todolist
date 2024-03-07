import {todoListsReducer} from './todoListsReducer';
import {tasksReducer} from './tasksReducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof rootReducer>
//@ts-ignore
window.store = store