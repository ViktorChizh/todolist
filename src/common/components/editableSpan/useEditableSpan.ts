import { ChangeEvent, useState } from "react"

export const useEditableSpan = (oldTitle: string, callBack: (newTitle: string) => void) => {
  const [edit, setEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(oldTitle)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
  const addTask = () => callBack(newTitle)
  const editFoo = () => {
    setEdit(!edit)
    if (edit !== false) {
      addTask()
    }
  }

  return { edit, newTitle, editFoo, onChangeHandler }
}
