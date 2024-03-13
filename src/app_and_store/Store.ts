import {todoListsReducer, TodoListsReducerActionType} from '../features/pageTodolists/todolist/TodoListsReducer';
import {tasksReducer, TasksReducerActionType} from '../features/pageTodolists/todolist/task/TasksReducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer, AppReducerActionType} from './AppReducer';

const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
//types
export type AppStoreType = ReturnType<typeof rootReducer>
export type StoreReducerActionType = TodoListsReducerActionType | TasksReducerActionType | AppReducerActionType// или просто AnyAction
export type AppDispatchType = ThunkDispatch<AppStoreType, unknown, StoreReducerActionType>
//hooks
export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector

//@ts-ignore
window.store = store