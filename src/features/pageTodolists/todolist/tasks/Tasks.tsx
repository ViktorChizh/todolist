import React, { FC } from "react"
import { Task } from "features/pageTodolists/todolist/tasks/task/Task"
import { useTasks } from "features/pageTodolists/todolist/tasks/useTasks"
import { TodolistType } from "features/pageTodolists/todolist/TodoListsReducer"

type PropsType = {
  todoList: TodolistType
  disabled: boolean
}
export const Tasks: FC<PropsType> = ({ todoList, disabled }) => {
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
