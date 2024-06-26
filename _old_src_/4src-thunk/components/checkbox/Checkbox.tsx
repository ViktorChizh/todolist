import React, { ChangeEvent, FC, memo } from "react"

type CheckBoxType = {
  checked: boolean
  onChange: (checked: boolean) => void
}

export const Checkbox: FC<CheckBoxType> = memo(({ checked, onChange }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.checked)
  }

  return <input type="checkbox" onChange={onChangeHandler} checked={checked} />
})
