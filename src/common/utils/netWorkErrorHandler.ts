import { AppDispatchType } from "app_and_store/Store"
import { setAppError, setAppStatus } from "app_and_store/AppReducer"

export const netWorkErrorHandler = (e: _ErrorType, dispatch: AppDispatchType) => {
  dispatch(setAppError({ error: e.message }))
  dispatch(setAppStatus({ status: "failed" }))
}
type _ErrorType = { message: string }
