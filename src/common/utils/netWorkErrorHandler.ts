import { AppDispatchType } from "app/Store"
import { setAppErrorAC, setAppStatusAC } from "app/AppReducer"
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
  dispatch(setAppErrorAC({ error }))
  dispatch(setAppStatusAC({ status: "failed" }))
}
