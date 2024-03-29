import { useCallback } from "react"
import { removeTaskTC, updateTaskTC } from "./TasksReducer"
import { TaskType } from "../../../../api/api"
import { useAppDispatch } from "../../../../app_and_store/Store"
/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */
export const useTask = (task: TaskType, idTDL: string) => {
  const dispatch = useAppDispatch()
  const onClickHandler = useCallback(
    () => dispatch(removeTaskTC(idTDL, task.id)),
    [dispatch, idTDL, task.id],
  )
  const updateTaskHandler = useCallback(
    (title: string) => {
      dispatch(updateTaskTC(idTDL, task.id, { title: title }))
    },
    [dispatch, idTDL, task.id],
  )
  const onChangeHandler = useCallback(
    (e: boolean) => {
      dispatch(updateTaskTC(idTDL, task.id, { status: e ? 1 : 0 }))
    },
    [dispatch, idTDL, task.id],
  )

  return { onClickHandler, updateTaskHandler, onChangeHandler }
}
