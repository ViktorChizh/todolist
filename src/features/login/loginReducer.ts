import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk, serverErrorHandler, thunkTryCatch } from "common/utils"
import { api, LoginParamsType, ResponseMeType } from "common/api"
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
      .addCase(meTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
        state.isInitialized = true
      })
      .addCase(meTC.rejected, (state) => {
        state.isInitialized = true
      })
      .addCase(loginTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logoutTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
  selectors: {
    isLoggedInSelector: (state) => state.isLoggedIn,
    isInitializedAppSelector: (state) => state.isInitialized,
  },
})
// thunks
export const meTC = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/meTC`, (_, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { dispatch, rejectWithValue } = thunkAPI
    let res = await api.me()
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true }
    } else {
      serverErrorHandler<ResponseMeType>(res.data, dispatch)
      return rejectWithValue(null)
    }
  })
})
export const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  `м/loginTC`,
  (params, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      let res = await api.login(params)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        return { isLoggedIn: true }
      } else {
        const { dispatch, rejectWithValue } = thunkAPI
        // если есть поля с ошибками, то отобразим их на форме, если нет - то глобально
        const showError = !res.data.fieldsErrors.length
        serverErrorHandler<{ userId?: number }>(res.data, dispatch, showError)
        return rejectWithValue(res.data)
      }
    })
  },
)
export const logoutTC = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/logoutTC`,
  (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch, rejectWithValue } = thunkAPI
      let res = await api.logout()
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(clearDataAfterLogoutAC({ tasks: {}, todolists: [] }))
        return { isLoggedIn: false }
      } else {
        serverErrorHandler(res.data, dispatch)
        return rejectWithValue(null)
      }
    })
  },
)
//exports
export const loginReducer = slice.reducer
export const { isLoggedInSelector, isInitializedAppSelector } = slice.selectors
export const loginThunks = { meTC, loginTC, logoutTC }
