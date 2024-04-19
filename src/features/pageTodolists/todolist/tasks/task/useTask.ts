import { TaskApp } from "features/pageTodolists/todolist/tasks/TasksReducer"
import { useActions } from "common/hooks"

export const useTask = (task: TaskApp, idTDL: string) => {
  const { removeTaskTC: removeTask, updateTaskTC: updateTask } = useActions()
  const onClickHandler = () => removeTask({ idTDL, taskId: task.id })
  const updateTaskHandler = async (title: string) => {
    updateTask({ idTDL, taskId: task.id, model: { title: title } })
  }
  const onChangeHandler = (e: boolean) => {
    updateTask({ idTDL, taskId: task.id, model: { status: e ? 1 : 0 } })
  }
  return { onClickHandler, updateTaskHandler, onChangeHandler }
}
