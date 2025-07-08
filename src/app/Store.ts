import { todoListsReducer } from "features/pageTodolists/todolist/TodoListsReducer"
import { tasksReducer } from "features/pageTodolists/todolist/tasks/TasksReducer"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { appReducer } from "./AppReducer"
import { loginReducer } from "features/login/loginReducer"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    app: appReducer,
    login: loginReducer,
    tasks: tasksReducer,
    todolists: todoListsReducer,
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
