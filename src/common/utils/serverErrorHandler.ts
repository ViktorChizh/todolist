import { setAppErrorAC, setAppStatusAC } from "app/AppReducer"
import { AppDispatchType } from "app/Store"
import { ResponseType } from "common/api/api"

export const serverErrorHandler = <T>(res: ResponseType<T>, dispatch: AppDispatchType) => {
  if (res.messages.length) {
    dispatch(setAppErrorAC({ error: res.messages[0] }))
  } else {
    dispatch(setAppErrorAC({ error: "some application error" }))
  }
  dispatch(setAppStatusAC({ status: "failed" }))
}
