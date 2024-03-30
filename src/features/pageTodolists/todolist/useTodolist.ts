import { useAppDispatch, useAppSelector } from "app_and_store/Store"
import { addTaskTC, tasksSelector } from "./task/TasksReducer"
import { useCallback, useMemo } from "react"
import { FilterValuesType, removeTodolistTC, updateTodolist, updateTodolistTC } from "./TodoListsReducer"

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
  const onAllClickHandler = useCallback(
    () => dispatch(updateTodolist({ idTDL, model: { filter: "all" } })),
    [dispatch, idTDL],
  )
  const onActiveClickHandler = useCallback(
    () => dispatch(updateTodolist({ idTDL, model: { filter: "active" } })),
    [dispatch, idTDL],
  )
  const onCompletedClickHandler = useCallback(
    () => dispatch(updateTodolist({ idTDL, model: { filter: "completed" } })),
    [dispatch, idTDL],
  )
  const addTaskHandler = useMemo(() => {
    return (title: string) => {
      dispatch(addTaskTC(idTDL, title))
    }
  }, [dispatch, idTDL]) //чисто попробовать useMemo
  const updateTodolistHandler = useCallback(
    (title: string) => {
      dispatch(updateTodolistTC(idTDL, title))
    },
    [dispatch, idTDL],
  )

  return {
    tasks,
    removeTodolist,
    onAllClickHandler,
    onActiveClickHandler,
    onCompletedClickHandler,
    addTaskHandler,
    updateTodolistHandler,
  }
}
