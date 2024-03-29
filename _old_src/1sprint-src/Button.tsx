import React from "react"

type ButtonPropsType = {
  title: string
  onClickHandler?: () => void
  isDisabled?: boolean
  classes?: string
}
export const Button = (props: ButtonPropsType) => {
  return (
    <button onClick={props.onClickHandler} disabled={props.isDisabled} className={props.classes}>
      {props.title}
    </button>
  )
}
