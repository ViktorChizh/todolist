import React from "react"
import TextField from "@mui/material/TextField"
import { useEditableSpan } from "common/components/editableSpan/useEditableSpan"

type Props = {
  oldTitle: string
  callBack: (newTitle: string) => void
  disabled?: boolean
}

export const EditableSpan = ({ oldTitle, callBack, disabled }: Props) => {
  const { edit, newTitle, editFoo, onChangeHandler } = useEditableSpan(oldTitle, callBack)

  return edit && !disabled ? (
    <TextField
      id="outlined-basic"
      label={oldTitle}
      variant="outlined"
      size="small"
      disabled={disabled}
      onBlur={editFoo}
      value={newTitle}
      onChange={onChangeHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={editFoo}>{oldTitle}</span>
  )
}
