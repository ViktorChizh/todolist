import { useCallback } from "react"
import { TaskType } from "./TasksReducer"
import { useActions } from "common/hooks"
/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */
export const useTask = (task: TaskType, idTDL: string) => {
  const { removeTaskTC: removeTask, updateTaskTC: updateTask } = useActions()
  const onClickHandler = useCallback(() => removeTask({ idTDL, taskId: task.id }), [removeTask, idTDL, task.id])
  const updateTaskHandler = useCallback(
    async (title: string) => {
      updateTask({ idTDL, taskId: task.id, model: { title: title } })
    },
    [updateTask, idTDL, task.id],
  )
  const onChangeHandler = useCallback(
    (e: boolean) => {
      updateTask({ idTDL, taskId: task.id, model: { status: e ? 1 : 0 } })
    },
    [updateTask, idTDL, task.id],
  )

  return { onClickHandler, updateTaskHandler, onChangeHandler }
}
