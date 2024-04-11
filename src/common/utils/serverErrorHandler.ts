import { setAppErrorAC, setAppStatusAC } from "app/AppReducer"
import { AppDispatchType } from "app/Store"
import { ResponseType } from "common/api/api"
/**
 * Данная функция обрабатывает ошибки, которые могут возникнуть при взаимодействии с сервером.
 * @param data  - ответ от сервера в формате ResponseType<T>
 * @param dispatch - функция для отправки сообщений в store Redux
 * @param showError - флаг, указывающий, нужно ли отображать ошибки в пользовательском интерфейсе
 */
export const serverErrorHandler = <T>(res: ResponseType<T>, dispatch: AppDispatchType, showError: boolean = true) => {
  if (showError) {
    dispatch(setAppErrorAC({ error: res.messages.length ? res.messages[0] : "some application error" }))
  }
  dispatch(setAppStatusAC({ status: "failed" }))
}
