import React, { FC, memo } from "react"
import TextField from "@mui/material/TextField"
import { useEditableSpan } from "./useEditableSpan"

type EditableSpanProps = {
  oldTitle: string
  callBack: (newTitle: string) => void
  disabled?: boolean
}

export const EditableSpan: FC<EditableSpanProps> = memo((props) => {
  const { edit, newTitle, editFoo, onChangeHandler } = useEditableSpan(
    props.oldTitle,
    props.callBack,
  )

  return edit && !props.disabled ? (
    <TextField
      id="outlined-basic"
      label={props.oldTitle}
      variant="outlined"
      size="small"
      disabled={props.disabled}
      onBlur={editFoo}
      value={newTitle}
      onChange={onChangeHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={editFoo}>{props.oldTitle}</span>
  )
})
