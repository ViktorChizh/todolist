import { setAppErrorAC, setAppStatusAC } from "app_and_store/AppReducer"
import { AppDispatchType } from "app_and_store/Store"
import { ResponseType } from "api/api"

export const ServerErrorHandler = <T>(res: ResponseType<T>, dispatch: AppDispatchType) => {
  if (res.messages.length) {
    dispatch(setAppErrorAC({ error: res.messages[0] }))
  } else {
    dispatch(setAppErrorAC({ error: "some application error" }))
  }
  dispatch(setAppStatusAC({ status: "failed" }))
}

export const NetWorkErrorHandler = (e: _ErrorType, dispatch: AppDispatchType) => {
  dispatch(setAppErrorAC({ error: e.message }))
  dispatch(setAppStatusAC({ status: "failed" }))
}

type _ErrorType = { message: string }
