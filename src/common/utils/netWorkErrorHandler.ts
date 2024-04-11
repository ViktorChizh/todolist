import { AppDispatchType } from "app/Store"
import { setAppErrorAC, setAppStatusAC } from "app/AppReducer"
import axios from "axios"
/**
 * Данная функция обрабатывает ошибки, которые могут возникнуть при работе приложения, дополнительно к ошибкам на сервере.
 * @param e - генерируемая ошибка
 * @param dispatch - функция для отправки сообщений в store Redux
 */
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
