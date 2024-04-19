import React, { FC, memo, useMemo } from "react"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import { TodolistType } from "./TodoListsReducer"
import { ButtonsElement } from "features/pageTodolists/todolist/buttonsElement/ButtonsElement"
import { TodolistTitle } from "features/pageTodolists/todolist/todolistTitle/TodolistTitle"
import { Tasks } from "features/pageTodolists/todolist/tasks/Tasks"
import { useActions } from "common/hooks"

export const Todolist: FC<{ todoList: TodolistType }> = memo(({ todoList }) => {
  const disabled = todoList.todoStatus === "loading"
  const { addTaskTC: addTask } = useActions()
  const addTaskHandler = useMemo(() => {
    return async (title: string) => {
      addTask({ idTDL: todoList.id, title })
    }
  }, [todoList.id, addTask]) //чисто попробовать useMemo как более общий вариант useCallback
  return (
    <div style={{ position: "relative", width: "250px", height: "304px", display: "flex", flexDirection: "column" }}>
      <TodolistTitle todoList={todoList} disabled={disabled} />
      <AddItemForm callBack={addTaskHandler} placeholder={"add new task"} disabled={disabled} />
      <Tasks todoList={todoList} disabled={disabled} />
      <ButtonsElement todoList={todoList} disabled={disabled} />
    </div>
  )
})
