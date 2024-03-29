import {
  setAppErrorAC,
  SetAppErrorType,
  setAppStatusAC,
  SetAppStatusType,
} from "../app/app-reducer"
import { Dispatch } from "redux"
import { ResponseType } from "../api/todolists-api"

type ErrorUtilsDispatchType = Dispatch<SetAppErrorType | SetAppStatusType>

export type _ErrorType = {
  message: string
}

export const handleServerAppError = <T>(
  dispatch: ErrorUtilsDispatchType,
  data: ResponseType<T>,
) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC("Some error"))
  }
  dispatch(setAppStatusAC("failed"))
}

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, e: _ErrorType) => {
  dispatch(setAppErrorAC(e.message))
  dispatch(setAppStatusAC("failed"))
}
