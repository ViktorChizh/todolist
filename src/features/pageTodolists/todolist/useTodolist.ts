import { useCallback, useMemo } from "react"
import { FilterValuesType } from "./TodoListsReducer"
import { useActions, useAppDispatch, useAppSelector } from "common/hooks"
import { tasksSelector } from "common/selectors"

/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */
export const useTodolist = (idTDL: string, filter: FilterValuesType) => {
  let tasks = useAppSelector(tasksSelector)[idTDL]
  let isTasksListEmpty = !tasks.length
  const {
    addTaskTC: addTask,
    removeTodolistTC: removeTodoList,
    updateTodolistFilterTC: updateTodolistFilter,
    updateTodolistTitleTC: updateTodolistTitle,
  } = useActions()
  const dispatch = useAppDispatch()

  useMemo(() => {
    if (tasks && filter === "active") {
      tasks = tasks.filter((t) => t.status === 0)
    }
    if (filter === "completed") {
      tasks = tasks.filter((t) => t.status === 1)
    }
    return tasks
  }, [filter, tasks])

  const removeTodolist = useCallback(() => removeTodoList(idTDL), [dispatch, idTDL])
  const onClickFilterHandler = useCallback(
    (filter: FilterValuesType) => updateTodolistFilter({ idTDL, filter }),
    [dispatch, idTDL],
  )
  const addTaskHandler = useMemo(() => {
    return (title: string) => {
      addTask({ idTDL, title })
    }
  }, [dispatch, idTDL]) //чисто попробовать useMemo
  const updateTodolistHandler = useCallback(
    (title: string) => {
      updateTodolistTitle({ idTDL, title })
    },
    [dispatch, idTDL],
  )

  return { tasks, isTasksListEmpty, removeTodolist, onClickFilterHandler, addTaskHandler, updateTodolistHandler }
}
