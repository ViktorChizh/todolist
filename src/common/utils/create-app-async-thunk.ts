import { AppDispatch, AppState } from "app/Store"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { BaseResponse } from "common/api"


export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState
  dispatch: AppDispatch
  rejectValue: BaseResponse | null
}>()
