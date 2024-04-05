import React, { FC, memo } from "react"
import { Checkbox } from "common/components/checkbox/Checkbox"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useTask } from "./useTask"
import { TaskType } from "common/api/api"

type TaskPropsType = {
  task: TaskType
  todolistId: string
  todoStatus?: boolean
}

export const Task: FC<TaskPropsType> = memo(({ task, todolistId, todoStatus }) => {
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
})
