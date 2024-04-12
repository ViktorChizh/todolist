import { setAppErrorAC, setAppStatusAC } from "app/AppReducer"
import { AppDispatchType } from "app/Store"
import { BaseResponseType } from "common/api/api"
/**
 * Данная функция обрабатывает ошибки, которые могут возникнуть при взаимодействии с сервером.
 * @param data  - ответ от сервера в формате ResponseType<T>
 * @param dispatch - функция для отправки сообщений в store Redux
 * @param showError - флаг, указывающий, нужно ли отображать ошибки в пользовательском интерфейсе
 */
export const serverErrorHandler = <T>(
  res: BaseResponseType<T>,
  dispatch: AppDispatchType,
  showError: boolean = true,
) => {
  //дополнительно отключаем очевидную стандартную глобальную ошибку на странице логинизации
  if (showError && res.messages[0] !== "You are not authorized") {
    dispatch(setAppErrorAC({ error: res.messages.length ? res.messages[0] : "some application error" }))
  }
  dispatch(setAppStatusAC({ status: "failed" }))
}
