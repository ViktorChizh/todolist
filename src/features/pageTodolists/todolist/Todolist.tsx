import React, { FC, memo } from "react"
import { AddItemForm } from "components/addItemForm/AddItemForm"
import { EditableSpan } from "components/editableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Button from "@mui/material/Button"
import { TodolistType } from "./TodoListsReducer"
import { Task } from "./task/Task"
import { useTodolist } from "./useTodolist"

type PropsType = {
  todoList: TodolistType
  demo?: boolean
}

export const Todolist: FC<PropsType> = memo(({ todoList, demo }) => {
  const {
    tasks,
    removeTodolist,
    onAllClickHandler,
    onActiveClickHandler,
    onCompletedClickHandler,
    addTaskHandler,
    updateTodolistHandler,
  } = useTodolist(todoList.id, todoList.filter)

  const disabled = todoList.todoStatus === "loading"

  return (
    <div>
      <h3>
        <EditableSpan
          oldTitle={todoList.title}
          callBack={updateTodolistHandler}
          disabled={disabled}
        />
        <IconButton
          color="primary"
          aria-label="delete"
          onClick={removeTodolist}
          disabled={disabled}
        >
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm callBack={addTaskHandler} placeholder={"add new task"} disabled={disabled} />
      <ul>
        {tasks.map((t) => (
          <Task key={t.id} task={t} todolistId={todoList.id} todoStatus={disabled} />
        ))}
      </ul>
      {!tasks.length && (
        <span style={{ color: "red", display: "block", margin: "10px" }}>tasksList is empty</span>
      )}
      <div
        style={{
          display: "flex",
          margin: "0 auto",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          onClick={onAllClickHandler}
          color="success"
          disabled={disabled}
          variant={todoList.filter === "all" ? "outlined" : "contained"}
        >
          {" "}
          All{" "}
        </Button>
        <Button
          size="small"
          onClick={onActiveClickHandler}
          color="error"
          disabled={disabled}
          variant={todoList.filter === "active" ? "outlined" : "contained"}
        >
          {" "}
          Active{" "}
        </Button>
        <Button
          size="small"
          onClick={onCompletedClickHandler}
          color="primary"
          disabled={disabled}
          variant={todoList.filter === "completed" ? "outlined" : "contained"}
        >
          {" "}
          Completed{" "}
        </Button>
      </div>
    </div>
  )
})
