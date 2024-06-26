import React from "react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"
import { useActions } from "common/hooks"
import { TodolistApp } from "features/pageTodolists/todolist/TodoListsReducer"

type Props = {
  todoList: TodolistApp
  disabled: boolean
}
export const TodolistTitle = ({ todoList, disabled }: Props) => {
  const { removeTodolistTC: removeTodoList, updateTodolistTitleTC: updateTodolistTitle } = useActions()
  const removeTodolist = () => removeTodoList(todoList.id)
  const updateTodolistHandler = (title: string) => updateTodolistTitle({ idTDL: todoList.id, title })

  return (
    <>
      <IconButton
        color="primary"
        aria-label="delete"
        onClick={removeTodolist}
        disabled={disabled}
        style={{ position: "absolute", top: "-5px", right: "-10px" }}>
        <DeleteIcon />
      </IconButton>
      <h4 style={{ margin: "0 35px 10px 0", height: "10%", overflowY: "auto", overflowX: "clip" }}>
        <EditableSpan oldTitle={todoList.title} callBack={updateTodolistHandler} disabled={disabled} />
      </h4>
    </>
  )
}
