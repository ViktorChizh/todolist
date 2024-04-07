import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react"
/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */
export const useAddItemForm = (callBack: (title: string) => void) => {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addTask = useCallback(() => {
    let newTitle = title.trim()
    if (newTitle !== "") {
      callBack(newTitle)
      setTitle("")
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
      if (e.charCode === 13) {
        // так показывает устаревшие свойства, но они работают! правильно: e.key === 'Enter'
        addTask()
      }
    },
    [addTask, error],
  )

  return { title, error, addTask, onChangeHandler, onKeyPressHandler }
}
