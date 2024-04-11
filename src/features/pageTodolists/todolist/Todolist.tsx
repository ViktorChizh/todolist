import React, { FC, memo } from "react"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { FilterValuesType, TodolistType } from "./TodoListsReducer"
import { Task } from "./task/Task"
import { useTodolist } from "./useTodolist"
import Button from "@mui/material/Button"

export const Todolist: FC<{ todoList: TodolistType }> = memo(({ todoList }) => {
  const { tasks, isTasksListEmpty, removeTodolist, onClickFilterHandler, addTaskHandler, updateTodolistHandler } =
    useTodolist(todoList.id, todoList.filter)
  const disabled = todoList.todoStatus === "loading"
  // в отдельную компоненту выносить нет смысла, т.к. передаваемых значений очень много и ничего не выигрываешь
  // но если использовать замыкание, то количество настроек резко уменьшается + общий колбэк фильтра на кнопки
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
    <div>
      <h3>
        <EditableSpan oldTitle={todoList.title} callBack={updateTodolistHandler} disabled={disabled} />
        <IconButton color="primary" aria-label="delete" onClick={removeTodolist} disabled={disabled}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm callBack={addTaskHandler} placeholder={"add new task"} disabled={disabled} />
      <ul>{tasks && tasks.map((t) => <Task key={t.id} task={t} todolistId={todoList.id} todoStatus={disabled} />)}</ul>
      {isTasksListEmpty && <span style={{ color: "red", display: "block", margin: "10px" }}>tasksList is empty</span>}
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        {buttonELement("info", "all")}
        {buttonELement("success", "active")}
        {buttonELement("error", "completed")}
      </div>
    </div>
  )
})
