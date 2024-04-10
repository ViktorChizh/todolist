import { todoListsReducer } from "features/pageTodolists/todolist/TodoListsReducer"
import { tasksReducer } from "features/pageTodolists/todolist/task/TasksReducer"
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
//types
export type AppStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
//hooks
export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

//@ts-ignore
window.store = store
// типизация action в Redux (типизируется вoзврат колбэка в котором лежит thunk):
// export type AppActionType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AnyAction>
