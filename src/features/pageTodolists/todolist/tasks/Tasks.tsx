import React from "react"
import { Task } from "features/pageTodolists/todolist/tasks/task/Task"
import { useTasks } from "features/pageTodolists/todolist/tasks/useTasks"
import { TodolistApp } from "features/pageTodolists/todolist/TodoListsReducer"

type Props = {
  todoList: TodolistApp
  disabled: boolean
}
export const Tasks = ({ todoList, disabled }: Props) => {
  const { tasks, isTasksListEmpty } = useTasks(todoList)
  return (
    <ul style={{ flex: "1", overflowY: "auto" }}>
      {tasks && tasks.map((t) => <Task key={t.id} task={t} todolistId={todoList.id} todoStatus={disabled} />)}
      {isTasksListEmpty && (
        <span style={{ color: "red", fontStyle: "italic", display: "block", margin: "60px auto" }}>
          <b>TasksList is empty</b>
        </span>
      )}
    </ul>
  )
}
