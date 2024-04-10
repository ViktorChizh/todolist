import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { meTC } from "features/login/loginReducer"

const initialState: AppStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
  errorPage: false,
}

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: StatusType }>) {
      state.status = action.payload.status
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppErrorPageAC(state, action: PayloadAction<{ errorPage: boolean }>) {
      state.errorPage = action.payload.errorPage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(meTC.fulfilled, (state) => {
        state.isInitialized = true
      })
      .addCase(meTC.rejected, (state) => {
        state.isInitialized = true
      })
  },
  selectors: {
    statusAppSelector: (state) => state.status,
    errorAppSelector: (state) => state.error,
    isInitializedAppSelector: (state) => state.isInitialized,
    errorPageAppSelector: (state) => state.errorPage,
  },
})

export const appReducer = slice.reducer
export const { setAppStatusAC, setAppErrorAC, setAppErrorPageAC } = slice.actions
export const { statusAppSelector, errorAppSelector, isInitializedAppSelector, errorPageAppSelector } = slice.selectors
//types
export type StatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppStateType = {
  status: StatusType
  error: string | null
  isInitialized: boolean
  errorPage: boolean
}
