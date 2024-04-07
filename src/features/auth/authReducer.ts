import { setAppStatusAC } from "app/AppReducer"
import { api, LoginParamsType, ResponseMeType } from "common/api/api"
import { serverErrorHandler } from "common/utils/serverErrorHandler"
import { cleanTodolistAC } from "features/pageTodolists/todolist/TodoListsReducer"
import { cleanTasksAC } from "features/pageTodolists/todolist/task/TasksReducer"
import { createSlice } from "@reduxjs/toolkit"
import { netWorkErrorHandler } from "common/utils/netWorkErrorHandler"
import { resultCode } from "common/enums"
import { createAppAsyncThunk } from "common/utils"

const slice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(meTC.fulfilled, (state) => {
        state.isLoggedIn = true
      })
      .addCase(loginTC.fulfilled, (state) => {
        state.isLoggedIn = true
      })
      .addCase(logoutTC.fulfilled, (state) => {
        state.isLoggedIn = false
      })
  },
  selectors: {
    isLoggedInSelector: (state) => state.isLoggedIn,
  },
})
// thunks
export const meTC = createAppAsyncThunk<undefined>(`${slice.name}/meTC`, async (_, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    let res = await api.me()
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({ status: "succeeded" }))
    } else {
      serverErrorHandler<ResponseMeType>(res.data, dispatch)
      dispatch(setAppStatusAC({ status: "failed" }))
      return rejectWithValue(null)
    }
  } catch (e) {
    netWorkErrorHandler(e as Error, dispatch)
    dispatch(setAppStatusAC({ status: "failed" }))
    return rejectWithValue(null)
  }
})
export const loginTC = createAppAsyncThunk<undefined, LoginParamsType>(
  `${slice.name}/loginTC`,
  async (params: LoginParamsType, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    try {
      let res = await api.login(params)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(setAppStatusAC({ status: "succeeded" }))
      } else {
        serverErrorHandler<{ userId?: number }>(res.data, dispatch)
        dispatch(setAppStatusAC({ status: "failed" }))
        return rejectWithValue(null)
      }
    } catch (e) {
      netWorkErrorHandler(e as Error, dispatch)
      dispatch(setAppStatusAC({ status: "failed" }))
      return rejectWithValue(null)
    }
  },
)
export const logoutTC = createAppAsyncThunk<undefined>(
  `${slice.name}/logoutTC`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      let res = await api.logout()
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(cleanTodolistAC())
        dispatch(cleanTasksAC())
      } else {
        serverErrorHandler(res.data, dispatch)
        dispatch(setAppStatusAC({ status: "failed" }))
        return rejectWithValue(null)
      }
    } catch (e) {
      netWorkErrorHandler(e as Error, dispatch)
      dispatch(setAppStatusAC({ status: "failed" }))
      return rejectWithValue(null)
    }
  },
)
//exports
export const authReducer = slice.reducer
export const { isLoggedInSelector } = slice.selectors
export const authThunks = { meTC, loginTC, logoutTC }
