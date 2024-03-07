import {todoListsReducer, TodoListsReducerActionType} from './todoListsReducer';
import {tasksReducer, TasksReducerActionType} from './tasksReducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof rootReducer>

type AppActionType = TodoListsReducerActionType | TasksReducerActionType // или просто AnyAction

export type AppDispatchType = ThunkDispatch<AppStoreType, unknown, AppActionType>

//кастомные хуки для сокращения кода в компонентах при обращении:
export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector

//@ts-ignore
window.store = store