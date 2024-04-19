import React, { FC, useCallback } from "react"
import { FilterValuesType, TodolistType } from "features/pageTodolists/todolist/TodoListsReducer"
import Button from "@mui/material/Button"
import { useActions } from "common/hooks"

type PropsType = {
  todoList: TodolistType
  disabled: boolean
}

export const ButtonsElement: FC<PropsType> = ({ todoList, disabled }) => {
  const { updateTodolistFilterTC: updateTodolistFilter } = useActions()
  const onClickFilterHandler = useCallback(
    (filter: FilterValuesType) => updateTodolistFilter({ idTDL: todoList.id, filter }),
    [todoList.id, updateTodolistFilter],
  )
  const buttonELement = (color: "error" | "success" | "info", filter: FilterValuesType) => (
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
