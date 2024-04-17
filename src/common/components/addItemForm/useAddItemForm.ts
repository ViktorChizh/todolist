import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react"
/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */

export const useAddItemForm = (callBack: (title: string) => Promise<any>) => {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addTask = useCallback(async () => {
    let newTitle = title.trim()
    if (newTitle !== "") {
      await callBack(newTitle)
      if (newTitle.length <= 100) setTitle("")
    } else {
      setError("Title is required")
    }
  }, [title, callBack])
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }, [])
  const onKeyPressHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      error && setError(null)
      if (e.charCode === 13) addTask()
    },
    [addTask, error],
  )

  return { title, error, addTask, onChangeHandler, onKeyPressHandler }
}
