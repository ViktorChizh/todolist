import { useMemo } from "react"
import { useActions, useAppSelector } from "common/hooks"
import { tasksSelector } from "common/selectors"
import { TaskStatuses } from "common/enums"
import { TodolistApp } from "features/pageTodolists/todolist/TodoListsReducer"

export const useTasks = (todoList: TodolistApp) => {
  let tasks = useAppSelector(tasksSelector)[todoList.id]
  let isTasksListEmpty = !tasks?.length
  const { addTaskTC: addTask } = useActions()
  const addTaskHandler = async (title: string) => {
    return addTask({ idTDL: todoList.id, title }).unwrap()
  }
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
