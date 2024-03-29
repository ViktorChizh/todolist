import axios, { AxiosResponse } from "axios"
import { StatusType } from "../app_and_store/AppReducer"

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "7786fc28-3a8a-4ff6-a330-c22ffae6ff54",
  },
}
const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
})

export const api = {
  me() {
    return instance.get<ResponseType<ResponseMeType>>("auth/me")
  },
  login(params: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>("auth/login", params)
  },
  logout() {
    return instance.delete<ResponseType>("auth/login")
  },

  getTodolists() {
    return instance.get<TodolistServerType[]>("todo-lists")
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistServerType }>>("todo-lists", { title: title })
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`)
  },
  updateTodolist(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, { title: title })
  },

  getTasks(todolistId: string) {
    return instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return (
      instance
        // если надо указать типизацию третьего параметра, то надо указывать все три (но чаще хватит только первого)
        // при указании второго и третьего параметра, типизация первого игнорируется в пользу второго
        .post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>(
          `todo-lists/${todolistId}/tasks/`,
          { title: title },
        )
    )
  },
  deleteTask(todolistId: string, id: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`)
  },
  updateTask(todolistId: string, id: string, updateTask: UpdateServerTaskType) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`, updateTask)
  },
}

//enums
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export enum resultCode {
  SUCCEEDED = 0,
  ERROR = 1,
  CAPTCHA_ERROR = 10,
}

// types
export type ResponseMeType = {
  id: number
  email: string
  login: string
}
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}
export type TodolistServerType = {
  id: string
  title: string
  addedDate: Date
  order: number
}
export type ResponseType<T = {}> = {
  resultCode: number
  messages: string[]
  data: T
}
export type TaskServerType = {
  id: string
  title: string
  status: TaskStatuses
  todoListId: string
  description: string
  startDate: Date | null
  deadline: Date | null
  addedDate: Date
  order: number
  priority: TaskPriorities
}
export type TaskType = TaskServerType & { taskStatus: StatusType }
export type UpdateServerTaskType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: Date | null
  deadline: Date | null
}
export type ResponseTasksType = {
  items: TaskServerType[]
  totalCount: number
  error: string
}
export type ErrorType = {
  statusCode: number
  messages: [
    {
      message: string
      field: string
    },
  ]
  error: string
}
