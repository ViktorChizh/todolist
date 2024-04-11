import { AppDispatchType, AppStateType } from "app/Store"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { FieldErrorType, ResponseType } from "common/api/api"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppStateType
  dispatch: AppDispatchType
  rejectValue: null | ResponseType
}>()
