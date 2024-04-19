import React from "react"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import { ButtonsElement } from "features/pageTodolists/todolist/buttonsElement/ButtonsElement"
import { TodolistTitle } from "features/pageTodolists/todolist/todolistTitle/TodolistTitle"
import { Tasks } from "features/pageTodolists/todolist/tasks/Tasks"
import { useActions } from "common/hooks"
import { TodolistApp } from "features/pageTodolists/todolist/TodoListsReducer"

type Props = { todoList: TodolistApp }

export const Todolist = ({ todoList }: Props) => {
  const disabled = todoList.todoStatus === "loading"
  const { addTaskTC: addTask } = useActions()
  const addTaskHandler = async (title: string) => addTask({ idTDL: todoList.id, title }).unwrap()

  return (
    <div style={{ position: "relative", width: "250px", height: "304px", display: "flex", flexDirection: "column" }}>
      <TodolistTitle todoList={todoList} disabled={disabled} />
      <AddItemForm callBack={addTaskHandler} placeholder={"add new task"} disabled={disabled} />
      <Tasks todoList={todoList} disabled={disabled} />
      <ButtonsElement todoList={todoList} disabled={disabled} />
    </div>
  )
}
