import React from "react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { TaskApp } from "features/pageTodolists/todolist/tasks/TasksReducer"
import { useTask } from "features/pageTodolists/todolist/tasks/task/useTask"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"
import { Checkbox } from "common/components/checkbox/Checkbox"

type Props = {
  task: TaskApp
  todolistId: string
  todoStatus?: boolean
}

export const Task = ({ task, todolistId, todoStatus }: Props) => {
  const { onClickHandler, updateTaskHandler, onChangeHandler } = useTask(task, todolistId)
  const disabled = task.taskStatus === "loading" ? true : todoStatus
  return (
    <li className={task.status ? "is-done" : ""}>
      <Checkbox onChange={onChangeHandler} checked={!!task.status} disabled={disabled} />
      <EditableSpan oldTitle={task.title} callBack={updateTaskHandler} disabled={disabled} />
      <IconButton color="primary" aria-label="delete" onClick={onClickHandler} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </li>
  )
}
