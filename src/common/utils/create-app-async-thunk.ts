import { AppDispatchType, AppStateType } from "app_and_store/Store"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppStateType
  dispatch: AppDispatchType
  rejectValue: null
}>()
