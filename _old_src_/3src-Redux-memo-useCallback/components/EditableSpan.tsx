import React, { ChangeEvent, memo, useState } from "react"
import TextField from "@mui/material/TextField"

type EditableSpanProps = {
  oldTitle: string
  callBack: (newTitle: string) => void
}

export const EditableSpan = memo((props: EditableSpanProps) => {
  const [edit, setEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(props.oldTitle)

  const addTask = () => {
    props.callBack(newTitle)
  }
  const editFoo = () => {
    setEdit(!edit)
    if (edit !== false) {
      addTask()
    }
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  return edit ? (
    <TextField
      id="outlined-basic"
      label={props.oldTitle}
      variant="outlined"
      size="small"
      onBlur={editFoo}
      value={newTitle}
      onChange={onChangeHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={editFoo}>{props.oldTitle}</span>
  )
})
