import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: AppStateType = {
  status: "idle",
  error: null,
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
  selectors: {
    statusAppSelector: (state) => state.status,
    errorAppSelector: (state) => state.error,
    errorPageAppSelector: (state) => state.errorPage,
  },
})

export const appReducer = slice.reducer
export const { setAppStatusAC, setAppErrorAC, setAppErrorPageAC } = slice.actions
export const { statusAppSelector, errorAppSelector, errorPageAppSelector } = slice.selectors
//types
export type StatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppStateType = {
  status: StatusType
  error: string | null
  errorPage: boolean
}
