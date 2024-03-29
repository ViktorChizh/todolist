import { setAppError, setAppStatus } from "app_and_store/AppReducer"
import { AppDispatchType } from "app_and_store/Store"
import { ResponseType } from "api/api"

export const ServerErrorHandler = <T>(res: ResponseType<T>, dispatch: AppDispatchType) => {
  if (res.messages.length) {
    dispatch(setAppError({ error: res.messages[0] }))
  } else {
    dispatch(setAppError({ error: "some application error" }))
  }
  dispatch(setAppStatus({ status: "failed" }))
}

export const NetWorkErrorHandler = (e: _ErrorType, dispatch: AppDispatchType) => {
  dispatch(setAppError({ error: e.message }))
  dispatch(setAppStatus({ status: "failed" }))
}

type _ErrorType = { message: string }
