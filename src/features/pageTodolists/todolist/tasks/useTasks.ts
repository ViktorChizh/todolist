import { useMemo } from "react"
import { useActions, useAppSelector } from "common/hooks"
import { tasksSelector } from "common/selectors"
import { TaskStatuses } from "common/enums"
import { TodolistType } from "features/pageTodolists/todolist/TodoListsReducer"

export const useTasks = (todoList: TodolistType) => {
  let tasks = useAppSelector(tasksSelector)[todoList.id]
  let isTasksListEmpty = !tasks?.length
  const { addTaskTC: addTask } = useActions()
  const addTaskHandler = useMemo(() => {
    return async (title: string) => {
      addTask({ idTDL: todoList.id, title })
    }
  }, [todoList.id, addTask]) //чисто попробовать useMemo
  useMemo(() => {
    if (tasks && todoList.filter === "active") {
      tasks = tasks.filter((t) => t.status === TaskStatuses.New)
    }
    if (tasks && todoList.filter === "completed") {
      tasks = tasks.filter((t) => t.status === TaskStatuses.Completed)
    }
    return tasks
  }, [todoList.filter, tasks])

  return { tasks, isTasksListEmpty, addTaskHandler }
}
