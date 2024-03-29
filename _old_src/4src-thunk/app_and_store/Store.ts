import {
  todoListsReducer,
  TodoListsReducerActionType,
} from "../features/pageTodolists/todolist/todoListsReducer"
import {
  tasksReducer,
  TasksReducerActionType,
} from "../features/pageTodolists/todolist/task/tasksReducer"
import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { thunk, ThunkDispatch } from "redux-thunk"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

const rootReducer = combineReducers({
  todolists: todoListsReducer,
  tasks: tasksReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
//types
export type AppStoreType = ReturnType<typeof rootReducer>
type AppActionType = TodoListsReducerActionType | TasksReducerActionType // или просто AnyAction
export type AppDispatchType = ThunkDispatch<AppStoreType, unknown, AppActionType>
//hooks
export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector

//@ts-ignore
window.store = store
