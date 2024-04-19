import { useEffect } from "react"
import { isLoggedInSelector, todolistsSelector } from "common/selectors"
import { useActions, useAppSelector } from "common/hooks"

export const usePageTodoList = (demo: boolean) => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const todoLists = useAppSelector(todolistsSelector)
  const { addTodolistTC: addTodoList, setTodolistTC: setTodolist } = useActions()

  const addTodolist = async (title: string) => addTodoList(title).unwrap()

  useEffect(() => {
    if (demo || !isLoggedIn) return
    setTodolist()
  }, [])

  return { todoLists, addTodolist }
}
