import { createSlice, isFulfilled, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils"
import { api, LoginParams } from "common/api"
import { actions } from "common/actions"
import { resultCode } from "common/enums"

const slice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
    captchaUrl: ''
  },
  reducers: {
    captchaAC(state, action: PayloadAction<{ url: string }>) {
            state.captchaUrl = action.payload.url
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isFulfilled(meTC, loginTC, logoutTC), (state, action) => {
        state.isInitialized = true
        if(action.payload?.isLoggedIn !== undefined) state.isLoggedIn = action.payload.isLoggedIn
      })
      .addMatcher(isRejected(meTC), (state) => {
        state.isInitialized = true
      })
  },
  selectors: {
    isLoggedInSelector: (state) => state.isLoggedIn,
    isInitializedAppSelector: (state) => state.isInitialized,
    captchaUrlAppSelector: (state) => state.captchaUrl,

  },
})

export const meTC = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/meTC`,
  async (_, { rejectWithValue }) => {
    let res = await api.me()
    if (res.data.resultCode === resultCode.SUCCEEDED) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  },
)
export const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean } | undefined, LoginParams>(
  `${slice.name}/loginTC`,
  async (params, props) => {
    const { dispatch, rejectWithValue } = props
    let res = await api.login(params)
    if (res.data.resultCode === resultCode.SUCCEEDED) {
      dispatch(slice.actions.captchaAC({url: ''}))
      return { isLoggedIn: true }
    }
    else if (res.data.resultCode === resultCode.CAPTCHA_ERROR) {
      let captcha = await api.getCaptcha()
        dispatch(slice.actions.captchaAC({url: captcha.data.url}))
    }
    else {
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
export const { isLoggedInSelector, isInitializedAppSelector, captchaUrlAppSelector } = slice.selectors
export const loginThunks = { meTC, loginTC, logoutTC }
