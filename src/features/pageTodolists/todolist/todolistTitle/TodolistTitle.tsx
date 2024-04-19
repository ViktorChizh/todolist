import React, { FC, useCallback, useMemo } from "react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"
import { useActions } from "common/hooks"
import { TodolistType } from "features/pageTodolists/todolist/TodoListsReducer"

type PropsType = {
  todoList: TodolistType
  disabled: boolean
}
export const TodolistTitle: FC<PropsType> = ({ todoList, disabled }) => {
  const { removeTodolistTC: removeTodoList, updateTodolistTitleTC: updateTodolistTitle } = useActions()
  const removeTodolist = useCallback(() => removeTodoList(todoList.id), [todoList.id, removeTodoList])

  const updateTodolistHandler = useCallback(
    (title: string) => {
      updateTodolistTitle({ idTDL: todoList.id, title })
    },
    [todoList.id, updateTodolistTitle],
  )
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
      <h3 style={{ margin: "0 35px 10px 0", height: "10%", overflowY: "auto" }}>
        <EditableSpan oldTitle={todoList.title} callBack={updateTodolistHandler} disabled={disabled} />
      </h3>
    </>
  )
}
