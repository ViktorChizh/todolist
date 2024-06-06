import {todoListsReducer, TodoListsReducerActionType} from '../features/pageTodolists/todolist/TodoListsReducer';
import {tasksReducer, TasksReducerActionType} from '../features/pageTodolists/todolist/task/TasksReducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk, ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer, AppReducerActionType} from './AppReducer';
import {authReducer, AuthReducerActionsType} from '../auth/authReducer';

const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))
//types
export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, StoreReducerActionType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, StoreReducerActionType>
export type StoreReducerActionType =
    | TodoListsReducerActionType
    | TasksReducerActionType
    | AuthReducerActionsType
    | AppReducerActionType
//hooks
export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
//@ts-ignore
window.store = store