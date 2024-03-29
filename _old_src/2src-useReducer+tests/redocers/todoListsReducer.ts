import { FilterValuesType, TodolistType } from "../App"

export const TodoListsReducer = (
  state: TodolistType[],
  action: TodoListsReducerActionType,
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id)
    }
    case "ADD-TODOLIST": {
      return [...state, { id: action.payload.id, title: action.payload.title, filter: "all" }]
    }
    case "UPDATE-TODOLIST": {
      return state.map((tl) =>
        tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl,
      )
    }
    case "CHANGE-FILTER": {
      let todolist = state.find((tl) => tl.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.value
        return [...state]
      }
    }
    default:
      return state
  }
}

type TodoListsReducerActionType =
  | removeTodolistACType
  | addTodolistACType
  | updateTodolistACType
  | changeFilterACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (id: string) => ({
  type: "REMOVE-TODOLIST" as const,
  payload: { id },
})

type addTodolistACType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (id: string, title: string) => ({
  type: "ADD-TODOLIST" as const,
  payload: { id, title },
})

type updateTodolistACType = ReturnType<typeof updateTodolistAC>

export const updateTodolistAC = (id: string, title: string) => ({
  type: "UPDATE-TODOLIST" as const,
  payload: { id, title },
})

type changeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (id: string, value: FilterValuesType) => ({
  type: "CHANGE-FILTER" as const,
  payload: { id, value },
})
