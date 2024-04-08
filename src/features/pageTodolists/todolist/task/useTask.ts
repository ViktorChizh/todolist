import { useCallback } from "react"
import { removeTaskTC, TaskType, updateTaskTC } from "./TasksReducer"
import { useAppDispatch } from "app/Store"
/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */
export const useTask = (task: TaskType, idTDL: string) => {
  const dispatch = useAppDispatch()
  const onClickHandler = useCallback(
    () => dispatch(removeTaskTC({ idTDL, taskId: task.id })),
    [dispatch, idTDL, task.id],
  )
  const updateTaskHandler = useCallback(
    (title: string) => {
      dispatch(updateTaskTC({ idTDL, taskId: task.id, model: { title: title } }))
    },
    [dispatch, idTDL, task.id],
  )
  const onChangeHandler = useCallback(
    (e: boolean) => {
      dispatch(updateTaskTC({ idTDL, taskId: task.id, model: { status: e ? 1 : 0 } }))
    },
    [dispatch, idTDL, task.id],
  )

  return { onClickHandler, updateTaskHandler, onChangeHandler }
}
