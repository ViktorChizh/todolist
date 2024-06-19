import axios, { AxiosResponse } from "axios"
import { resultCode, TaskPriorities, TaskStatuses } from "common/enums"
import { TaskApp } from "features/pageTodolists/todolist/tasks/TasksReducer"

const settings = {
  withCredentials: true,
  headers: { "API-KEY": "7786fc28-3a8a-4ff6-a330-c22ffae6ff54" },
}
const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
})

export const api = {
  //login
  me() {
    return instance.get<BaseResponse<ResponseMe>>("auth/me")
  },
  login(params: LoginParams) {
    return instance.post<ResponseLogin>("auth/login", params)
  },
  logout() {
    return instance.delete<BaseResponse>("auth/login")
  },
  getCaptcha() {
    return instance.get<{url: string}>("security/get-captcha-url")
  },
  //todolist
  getTodolists() {
    return instance.get<TodolistServer[]>("todo-lists")
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: TodolistServer }>>("todo-lists", { title: title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
  updateTodolist(id: string, title: string) {
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title: title })
  },
  //tasks
  getTasks(todolistId: string) {
    return instance.get<ResponseTasks>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return (
      instance
        // если надо указать типизацию третьего параметра, то надо указывать все три (но чаще хватит только первого)
        // при указании второго и третьего параметра, типизация первого игнорируется в пользу второго
        .post<BaseResponse<{ item: TaskApp }>, AxiosResponse<BaseResponse<{ item: TaskApp }>>, { title: string }>(
          `todo-lists/${todolistId}/tasks/`,
          { title: title },
        )
    )
  },
  deleteTask(todolistId: string, id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${id}`)
  },
  updateTask(todolistId: string, id: string, updateTask: UpdateServerTask) {
    return instance.put<BaseResponse>(`todo-lists/${todolistId}/tasks/${id}`, updateTask)
  },
}
// types
export type TodolistServer = {
  id: string
  title: string
  addedDate: Date
  order: number
}
export type TaskServer = {
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
export type UpdateServerTask = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: Date | null
  deadline: Date | null
}

export type BaseResponse<T = {}> = {
  resultCode: resultCode
  messages: string[]
  data: T
  fieldsErrors?: FieldError[]
}
export type ResponseTasks = {
  items: TaskServer[]
  totalCount: number
  error: string
}
export type ResponseMe = {
  id: number
  email: string
  login: string
}
export type ResponseLogin = {
  data: {}
  messages: string[]
  fieldsErrors: FieldError[]
  resultCode: resultCode
}
export type FieldError = {
  field: string
  error: string
}
export type LoginParams = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
