import { setAppStatusAC } from "app/AppReducer"
import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk, netWorkErrorHandler, serverErrorHandler } from "common/utils"
import { api, FieldErrorType, LoginParamsType, ResponseMeType } from "common/api"
import { clearDataAfterLogoutAC } from "common/actions"
import { resultCode } from "common/enums"

const slice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(meTC.fulfilled, (state) => {
        state.isLoggedIn = true
        state.isInitialized = true
      })
      .addCase(meTC.rejected, (state) => {
        state.isInitialized = true
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
    isInitializedAppSelector: (state) => state.isInitialized,
  },
})
// thunks
export const meTC = createAppAsyncThunk<undefined, undefined>(
  `${slice.name}/meTC`,
  async (_, { dispatch, rejectWithValue }) => {
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
  },
)
export const loginTC = createAppAsyncThunk<
  undefined,
  LoginParamsType,
  { rejectValue: { error: string[]; field?: FieldErrorType[] } | null }
>(`${slice.name}/loginTC`, async (params: LoginParamsType, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    let res = await api.login(params)
    if (res.data.resultCode === resultCode.SUCCEEDED) {
      dispatch(setAppStatusAC({ status: "succeeded" }))
    } else {
      // если есть поля с ошибками, то отобразим их на форме, если нет - то глобально
      const showError = !res.data.fieldsErrors.length
      serverErrorHandler<{ userId?: number }>(res.data, dispatch, showError)
      dispatch(setAppStatusAC({ status: "failed" }))
      return rejectWithValue({ error: res.data.messages, field: res.data.fieldsErrors })
    }
  } catch (e) {
    netWorkErrorHandler(e, dispatch)
    dispatch(setAppStatusAC({ status: "failed" }))
    return rejectWithValue(null)
  }
})
export const logoutTC = createAppAsyncThunk<undefined, undefined>(
  `${slice.name}/logoutTC`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      let res = await api.logout()
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(clearDataAfterLogoutAC({ tasks: {}, todolists: [] }))
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
export const loginReducer = slice.reducer
export const { isLoggedInSelector, isInitializedAppSelector } = slice.selectors
export const loginThunks = { meTC, loginTC, logoutTC }
