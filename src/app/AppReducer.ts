import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { tasksThunks, todolistsThunks } from "common/thunks"
import { AnyAction } from "redux"

const initialState: AppState = {
  status: "idle",
  error: null,
}
const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
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
        if (
          action.type === todolistsThunks.addTodolistTC.rejected.type ||
          todolistsThunks.addTodolistTC.rejected.type ||
          tasksThunks.addTaskTC.rejected.type
        )
          return
        if (action.payload) {
          if (action.payload.messages[0] === "You are not authorized") return // удаляем очевидное оповещение
          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : "Some error occurred"
        }
      })
  },
  selectors: {
    statusAppSelector: (state) => state.status,
    errorAppSelector: (state) => state.error,
  },
})
export const appReducer = slice.reducer
export const { setAppErrorAC } = slice.actions
export const { statusAppSelector, errorAppSelector } = slice.selectors

export type Status = "idle" | "loading" | "succeeded" | "failed"
export type AppState = {
  status: Status
  error: string | null
}
