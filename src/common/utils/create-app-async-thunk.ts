import { AppDispatchType, AppStateType } from "app/Store"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppStateType
  dispatch: AppDispatchType
  rejectValue: null
}>()
