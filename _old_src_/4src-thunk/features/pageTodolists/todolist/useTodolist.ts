import { useAppDispatch, useAppSelector } from "../../../app_and_store/Store"
import { addTaskTC } from "./task/tasksReducer"
import { useCallback, useMemo } from "react"
import { changeFilterAC, FilterValuesType, removeTodolistTC, updateTodolistTC } from "./todoListsReducer"
import { TaskType } from "../../../api/todolists-api"
/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */
export const useTodolist = (idTDL: string, filter: FilterValuesType) => {
  let tasks = useAppSelector<TaskType[]>((state) => state.tasks[idTDL])
  const dispatch = useAppDispatch()
  useMemo(() => {
    if (filter === "active") {
      tasks = tasks.filter((t) => t.status === 0)
    }
    if (filter === "completed") {
      tasks = tasks.filter((t) => t.status === 1)
    }
    return tasks
  }, [filter, tasks]) // МОЖНО И БЕЗ ПЕРЕМЕННОЙ
  // если через переменную: tasks = useMemo( () => {тот же код},[filter, tasks])

  const removeTodolist = useCallback(() => dispatch(removeTodolistTC(idTDL)), [dispatch, idTDL])
  const onAllClickHandler = useCallback(() => dispatch(changeFilterAC(idTDL, "all")), [dispatch, idTDL])
  const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC(idTDL, "active")), [dispatch, idTDL])
  const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC(idTDL, "completed")), [dispatch, idTDL])
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
