import { todoListsReducer } from "features/pageTodolists/todolist/TodoListsReducer"
import { tasksReducer } from "features/pageTodolists/todolist/task/TasksReducer"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { appReducer } from "./AppReducer"
import { authReducer } from "auth/authReducer"
import { configureStore, ThunkAction } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { thunk } from "redux-thunk"

const rootReducer = combineReducers({
  todolists: todoListsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})
//types
export type AppStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
//hooks
export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
//@ts-ignore
window.store = store
