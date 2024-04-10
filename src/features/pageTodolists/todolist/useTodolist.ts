import { useAppDispatch, useAppSelector } from "app/Store"
import { addTaskTC } from "./task/TasksReducer"
import { tasksSelector } from "common/selectors"
import { useCallback, useMemo } from "react"
import { FilterValuesType, removeTodolistTC, updateTodolistFilterTC, updateTodolistTitleTC } from "./TodoListsReducer"

/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */
export const useTodolist = (idTDL: string, filter: FilterValuesType) => {
  let tasks = useAppSelector(tasksSelector)[idTDL]
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

  const removeTodolist = useCallback(() => dispatch(removeTodolistTC(idTDL)), [dispatch, idTDL])
  const onClickFilterHandler = useCallback(
    (filter: FilterValuesType) => dispatch(updateTodolistFilterTC({ idTDL, filter })),
    [dispatch, idTDL],
  )
  const addTaskHandler = useMemo(() => {
    return (title: string) => {
      dispatch(addTaskTC({ idTDL, title }))
    }
  }, [dispatch, idTDL]) //чисто попробовать useMemo
  const updateTodolistHandler = useCallback(
    (title: string) => {
      dispatch(updateTodolistTitleTC({ idTDL, title }))
    },
    [dispatch, idTDL],
  )

  return { tasks, removeTodolist, onClickFilterHandler, addTaskHandler, updateTodolistHandler }
}
