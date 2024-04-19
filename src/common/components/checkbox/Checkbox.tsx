import React, { ChangeEvent } from "react"

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export const Checkbox = ({ checked, onChange, disabled }: Props) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.checked)
  }

  return <input type="checkbox" onChange={onChangeHandler} checked={checked} disabled={disabled} />
}
