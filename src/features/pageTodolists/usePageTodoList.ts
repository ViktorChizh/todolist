import { useAppDispatch, useAppSelector } from "app/Store"
import { addTodolistTC, setTodolistTC } from "./todolist/TodoListsReducer"
import { useCallback, useEffect } from "react"
import { isLoggedInSelector, todolistsSelector } from "common/selectors"

export const usePageTodoList = (demo: boolean) => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const todoLists = useAppSelector(todolistsSelector)
  const dispatch = useAppDispatch()

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title))
    },
    [dispatch],
  )

  useEffect(() => {
    if (demo || !isLoggedIn) return
    dispatch(setTodolistTC())
  }, [])

  return { todoLists, addTodolist }
}
