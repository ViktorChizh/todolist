import React from "react"
import { FilterValues, TodolistApp } from "features/pageTodolists/todolist/TodoListsReducer"
import Button from "@mui/material/Button"
import { useActions } from "common/hooks"

type Props = {
  todoList: TodolistApp
  disabled: boolean
}

export const ButtonsElement = ({ todoList, disabled }: Props) => {
  const { updateTodolistFilterTC: updateTodolistFilter } = useActions()
  const onClickFilterHandler = (filter: FilterValues) => updateTodolistFilter({ idTDL: todoList.id, filter })
  const buttonELement = (color: "error" | "success" | "info", filter: FilterValues) => (
    <Button
      size="small"
      onClick={() => onClickFilterHandler(filter)}
      color={color}
      disabled={disabled || todoList.filter === filter}
      variant={todoList.filter === filter ? "outlined" : "contained"}>
      {`  ${filter}  `}
    </Button>
  )
  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
      {buttonELement("info", "all")}
      {buttonELement("success", "active")}
      {buttonELement("error", "completed")}
    </div>
  )
}
