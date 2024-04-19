import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { AnyAction } from "redux"

const initialState: AppState = {
  status: "idle",
  error: null,
  errorPage: false,
}

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppErrorPageAC(state, action: PayloadAction<{ errorPage: boolean }>) {
      state.errorPage = action.payload.errorPage
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.status = "failed"
        // if (
        //   action.type === todolistsThunks.addTodolistTC.rejected.type ||
        //   tasksThunks.addTaskTC.rejected.type ||
        //   todolistsThunks.addTodolistTC.rejected.type ||
        //   tasksThunks.addTaskTC.rejected.type ||
        //   loginThunks.meTC.rejected.type
        // )
        //   return
        if (action?.payload.messages[0] !== "You are not authorized") {
          if (action.payload) {
            state.error = action.payload.messages[0]
          } else {
            state.error = action.error.message ? action.error.message : "Some error occurred"
          }
        }
      })
  },
  selectors: {
    statusAppSelector: (state) => state.status,
    errorAppSelector: (state) => state.error,
    errorPageAppSelector: (state) => state.errorPage,
  },
})

export const appReducer = slice.reducer
export const { setAppErrorAC, setAppErrorPageAC } = slice.actions
export const { statusAppSelector, errorAppSelector, errorPageAppSelector } = slice.selectors
//types
export type Status = "idle" | "loading" | "succeeded" | "failed"
export type AppState = {
  status: Status
  error: string | null
  errorPage: boolean
}
