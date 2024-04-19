import { createSlice, isFulfilled, isRejected } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils"
import { api, LoginParams } from "common/api"
import { actions } from "common/actions"
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
      .addMatcher(isFulfilled(meTC, loginTC, logoutTC), (state, action) => {
        state.isInitialized = true
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addMatcher(isRejected(meTC), (state) => {
        state.isInitialized = true
      })
  },
  selectors: {
    isLoggedInSelector: (state) => state.isLoggedIn,
    isInitializedAppSelector: (state) => state.isInitialized,
  },
})
// thunks
export const meTC = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/meTC`,
  async (_, { rejectWithValue }) => {
    let res = await api.me()
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  },
)
export const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>(
  `${slice.name}/loginTC`,
  async (params, { rejectWithValue }) => {
    let res = await api.login(params)
    if (res.data.resultCode === resultCode.SUCCEEDED) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  },
)
export const logoutTC = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/logoutTC`,
  async (_, { dispatch, rejectWithValue }) => {
    let res = await api.logout()
    if (res.data.resultCode === resultCode.SUCCEEDED) {
      dispatch(actions.clearDataAC({ tasks: {}, todolists: [] }))
      return { isLoggedIn: false }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

export const loginReducer = slice.reducer
export const { isLoggedInSelector, isInitializedAppSelector } = slice.selectors
export const loginThunks = { meTC, loginTC, logoutTC }
