import { v1 } from "uuid"
import { addTodolistACType, removeTodolistACType } from "./todoListsReducer"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (
  state = initialState,
  action: TasksReducerActionType,
): TasksStateType => {
  switch (action.type) {
    case "ADD-TODOLIST": {
      return { ...state, [action.payload.id]: [] }
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state }
      delete stateCopy[action.payload.id]
      return stateCopy
    }
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (t) => t.id !== action.payload.id,
        ),
      }
    }
    case "ADD-TASK": {
      let newTask = { id: v1(), title: action.payload.title, isDone: false }
      return {
        ...state,
        [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]],
      }
    }
    case "CHANGE-STATUS": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.id ? { ...t, isDone: action.payload.isDone } : t,
        ),
      }
    }
    case "UPDATE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.id ? { ...t, title: action.payload.title } : t,
        ),
      }
    }
    default:
      return state
  }
}

export type TasksReducerActionType =
  | removeTaskACType
  | addTaskACType
  | changeStatusACType
  | updateTaskACType
  | addTodolistACType
  | removeTodolistACType

export const removeTaskslistAC = (id: string) => ({
  type: "REMOVE-TASKSLIST" as const,
  payload: { id },
})

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => ({
  type: "REMOVE-TASK" as const,
  payload: { id, todolistId },
})

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => ({
  type: "ADD-TASK" as const,
  payload: { todolistId, title },
})

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (id: string, todolistId: string, isDone: boolean) => ({
  type: "CHANGE-STATUS" as const,
  payload: { id, todolistId, isDone },
})

type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, id: string, title: string) => ({
  type: "UPDATE-TASK" as const,
  payload: { todolistId, id, title },
})
