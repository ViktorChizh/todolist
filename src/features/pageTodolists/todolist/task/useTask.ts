import { useCallback } from "react"
import { removeTask, updateTask } from "./TasksReducer"
import { TaskType } from "common/api/api"
import { useAppDispatch } from "app_and_store/Store"
/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */
export const useTask = (task: TaskType, idTDL: string) => {
  const dispatch = useAppDispatch()
  const onClickHandler = useCallback(() => dispatch(removeTask({ idTDL, taskId: task.id })), [dispatch, idTDL, task.id])
  const updateTaskHandler = useCallback(
    (title: string) => {
      dispatch(updateTask({ idTDL, taskId: task.id, model: { title: title } }))
    },
    [dispatch, idTDL, task.id],
  )
  const onChangeHandler = useCallback(
    (e: boolean) => {
      dispatch(updateTask({ idTDL, taskId: task.id, model: { status: e ? 1 : 0 } }))
    },
    [dispatch, idTDL, task.id],
  )

  return { onClickHandler, updateTaskHandler, onChangeHandler }
}
