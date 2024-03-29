import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: AppStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
  errorPage: true,
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
    setAppIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
    setAppErrorPageAC(state, action: PayloadAction<{ errorPage: boolean }>) {
      state.errorPage = action.payload.errorPage
    },
  },
})

export const appReducer = slice.reducer
export const { setAppStatusAC, setAppErrorAC, setAppIsInitializedAC, setAppErrorPageAC } =
  slice.actions

//types
export type StatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppStateType = {
  status: StatusType
  error: string | null
  isInitialized: boolean
  errorPage: boolean
}
