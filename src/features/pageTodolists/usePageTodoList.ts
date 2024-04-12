import { useCallback, useEffect } from "react"
import { isLoggedInSelector, todolistsSelector } from "common/selectors"
import { useActions, useAppSelector } from "common/hooks"

export const usePageTodoList = (demo: boolean) => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const todoLists = useAppSelector(todolistsSelector)
  const { addTodolistTC: addTodoList, setTodolistTC: setTodolist } = useActions()

  const addTodolist = useCallback((title: string) => {
    addTodoList(title)
  }, [])

  useEffect(() => {
    if (demo || !isLoggedIn) return
    setTodolist()
  }, [])

  return { todoLists, addTodolist }
}
