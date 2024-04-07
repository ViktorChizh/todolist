import { AppDispatchType, AppStateType } from "app/Store"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { FieldsErrorsType } from "common/api/api"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppStateType
  dispatch: AppDispatchType
  rejectValue: null | { error: string[]; field: FieldsErrorsType[] }[]
}>()
