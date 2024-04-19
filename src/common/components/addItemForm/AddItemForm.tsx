import React from "react"
import IconButton from "@mui/material/IconButton"
import QueueSharpIcon from "@mui/icons-material/QueueSharp"
import TextField from "@mui/material/TextField"
import { useAddItemForm } from "common/components/addItemForm/useAddItemForm"

type Props = {
  callBack: (title: string) => Promise<any>
  placeholder: string
  style?: { [key: string]: string }
  disabled?: boolean
  variant?: "outlined" | "filled" | "standard"
}

export const AddItemForm = ({ callBack, placeholder, style, disabled, variant }: Props) => {
  const { title, error, addTask, onChangeHandler, onKeyPressHandler } = useAddItemForm(callBack)

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        marginLeft: "-5wh",
        display: "flex",
        flexWrap: "nowrap",
      }}>
      <TextField
        placeholder={placeholder}
        id="outlined-basic"
        label={error ? error : placeholder}
        variant={variant || "outlined"}
        size="small"
        value={title}
        error={!!error}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        style={style}
        autoComplete="of"
        disabled={disabled}
      />
      <IconButton
        style={{ minWidth: "40px", minHeight: "40px" }}
        color="primary"
        aria-label="add item"
        onClick={addTask}
        disabled={disabled}>
        <QueueSharpIcon />
      </IconButton>
    </div>
  )
}
