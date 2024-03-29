import { setAppIsInitialized, setAppStatus } from "app_and_store/AppReducer"
import { api, ErrorType, LoginParamsType, ResponseMeType, resultCode } from "api/api"
import { NetWorkErrorHandler, ServerErrorHandler } from "utils/ErrorsHandler"
import axios from "axios"
import { cleanTodolist } from "features/pageTodolists/todolist/TodoListsReducer"
import { cleanTasks } from "features/pageTodolists/todolist/task/TasksReducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"

const initialState = { isLoggedIn: false }

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  selectors: {
    isLoggedInSelector: (state) => state.isLoggedIn,
  },
})

export const authReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions
export const { isLoggedInSelector } = slice.selectors
// thunks
export const meTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  try {
    let res = await api.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      dispatch(setAppStatus({ status: "succeeded" }))
    } else {
      ServerErrorHandler<ResponseMeType>(res.data, dispatch)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      NetWorkErrorHandler(e, dispatch)
    } else {
      NetWorkErrorHandler(e as Error, dispatch)
    }
  } finally {
    dispatch(setAppIsInitialized({ isInitialized: true }))
  }
}
export const loginTC = (params: LoginParamsType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  try {
    let res = await api.login(params)
    if (res.data.resultCode === resultCode.SUCCEEDED) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      dispatch(setAppStatus({ status: "succeeded" }))
    } else {
      ServerErrorHandler<{ userId?: number }>(res.data, dispatch)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      NetWorkErrorHandler(e, dispatch)
    } else {
      NetWorkErrorHandler(e as Error, dispatch)
    }
  }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    let res = await api.logout()
    if (res.data.resultCode === resultCode.SUCCEEDED) {
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      dispatch(cleanTodolist())
      dispatch(cleanTasks())
    } else {
      ServerErrorHandler(res.data, dispatch)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      NetWorkErrorHandler(e, dispatch)
    } else {
      NetWorkErrorHandler(e as Error, dispatch)
    }
  }
}
