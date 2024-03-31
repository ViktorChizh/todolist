import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
    setAppStatus(state, action: PayloadAction<{ status: StatusType }>) {
      state.status = action.payload.status
    },
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
    setAppErrorPage(state, action: PayloadAction<{ errorPage: boolean }>) {
      state.errorPage = action.payload.errorPage
    },
  },
  selectors: {
    statusAppSelector: (state) => state.status,
    errorAppSelector: (state) => state.error,
    isInitializedAppSelector: (state) => state.isInitialized,
    errorPageAppSelector: (state) => state.errorPage,
  },
})

export const appReducer = slice.reducer
export const { setAppStatus, setAppError, setAppIsInitialized, setAppErrorPage } = slice.actions
export const { statusAppSelector, errorAppSelector, isInitializedAppSelector, errorPageAppSelector } = slice.selectors
//types
export type StatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppStateType = {
  status: StatusType
  error: string | null
  isInitialized: boolean
  errorPage: boolean
}
