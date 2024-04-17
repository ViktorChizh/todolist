import { useCallback, useMemo } from "react"
import { FilterValuesType } from "./TodoListsReducer"
import { useActions, useAppSelector } from "common/hooks"
import { tasksSelector } from "common/selectors"

/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */
export const useTodolist = (idTDL: string, filter: FilterValuesType) => {
  let tasks = useAppSelector(tasksSelector)[idTDL]
  let isTasksListEmpty = !tasks?.length
  const {
    addTaskTC: addTask,
    removeTodolistTC: removeTodoList,
    updateTodolistFilterTC: updateTodolistFilter,
    updateTodolistTitleTC: updateTodolistTitle,
  } = useActions()

  useMemo(() => {
    if (tasks && filter === "active") {
      tasks = tasks.filter((t) => t.status === 0)
    }
    if (filter === "completed") {
      tasks = tasks.filter((t) => t.status === 1)
    }
    return tasks
  }, [filter, tasks])

  const removeTodolist = useCallback(() => removeTodoList(idTDL), [idTDL])
  const onClickFilterHandler = useCallback(
    (filter: FilterValuesType) => updateTodolistFilter({ idTDL, filter }),
    [idTDL],
  )
  const addTaskHandler = useMemo(() => {
    return async (title: string) => {
      addTask({ idTDL, title })
    }
  }, [idTDL]) //чисто попробовать useMemo
  const updateTodolistHandler = useCallback(
    (title: string) => {
      updateTodolistTitle({ idTDL, title })
    },
    [idTDL],
  )

  return { tasks, isTasksListEmpty, removeTodolist, onClickFilterHandler, addTaskHandler, updateTodolistHandler }
}
