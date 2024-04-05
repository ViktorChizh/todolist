import { AppDispatchType } from "app_and_store/Store"
import { setAppError, setAppStatus } from "app_and_store/AppReducer"
import axios from "axios"

export const netWorkErrorHandler = (e: unknown, dispatch: AppDispatchType) => {
  let error: string
  if (axios.isAxiosError(e)) {
    error = e.response?.data?.message || e?.message || "Some error occurred"
  } else if (e instanceof Error) {
    error = `Native error: ${e.message}`
  } else {
    error = JSON.stringify(e)
  }
  dispatch(setAppError({ error }))
  dispatch(setAppStatus({ status: "failed" }))
}
