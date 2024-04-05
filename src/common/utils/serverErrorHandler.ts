import { setAppError, setAppStatus } from "app_and_store/AppReducer"
import { AppDispatchType } from "app_and_store/Store"
import { ResponseType } from "common/api/api"

export const serverErrorHandler = <T>(res: ResponseType<T>, dispatch: AppDispatchType) => {
  if (res.messages.length) {
    dispatch(setAppError({ error: res.messages[0] }))
  } else {
    dispatch(setAppError({ error: "some application error" }))
  }
  dispatch(setAppStatus({ status: "failed" }))
}
