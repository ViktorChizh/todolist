import { setAppIsInitializedAC, setAppStatusAC } from "app_and_store/AppReducer"
import { api, ErrorType, LoginParamsType, ResponseMeType, resultCode } from "api/api"
import { NetWorkErrorHandler, ServerErrorHandler } from "utils/ErrorsHandler"
import axios from "axios"
import { cleanTodolistAC } from "features/pageTodolists/todolist/TodoListsReducer"
import { cleanTasksAC } from "features/pageTodolists/todolist/task/TasksReducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"

const initialState = { isLoggedIn: false }

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = slice.reducer
export const { setIsLoggedInAC } = slice.actions

// thunks
export const meTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    let res = await api.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
      dispatch(setAppStatusAC({ status: "succeeded" }))
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
    dispatch(setAppIsInitializedAC({ isInitialized: true }))
  }
}
export const loginTC = (params: LoginParamsType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    let res = await api.login(params)
    if (res.data.resultCode === resultCode.SUCCEEDED) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
      dispatch(setAppStatusAC({ status: "succeeded" }))
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
      dispatch(setIsLoggedInAC({ isLoggedIn: false }))
      dispatch(cleanTodolistAC())
      dispatch(cleanTasksAC())
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
