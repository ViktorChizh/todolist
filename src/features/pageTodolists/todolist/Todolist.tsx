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
    <div style={{ position: "relative", width: "250px", height: "304px", display: "flex", flexDirection: "column" }}>
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
      <AddItemForm callBack={addTaskHandler} placeholder={"add new task"} disabled={disabled} />
      <ul style={{ flex: "1", overflowY: "auto" }}>
        {tasks && tasks.map((t) => <Task key={t.id} task={t} todolistId={todoList.id} todoStatus={disabled} />)}
        {isTasksListEmpty && (
          <span style={{ color: "red", fontStyle: "italic", display: "block", margin: "60px auto" }}>
            <b>TasksList is empty</b>
          </span>
        )}
      </ul>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        {buttonELement("info", "all")}
        {buttonELement("success", "active")}
        {buttonELement("error", "completed")}
      </div>
    </div>
  )
})
