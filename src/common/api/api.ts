import axios, { AxiosResponse } from "axios"
import { resultCode, TaskPriorities, TaskStatuses } from "common/enums"
import { TaskType } from "features/pageTodolists/todolist/tasks/task/TasksReducer"

const settings = {
  withCredentials: true,
  headers: { "API-KEY": "7786fc28-3a8a-4ff6-a330-c22ffae6ff54" },
}
const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
})

export const api = {
  me() {
    return instance.get<BaseResponseType<ResponseMeType>>("auth/me")
  },
  login(params: LoginParamsType) {
    return instance.post<ResponseLoginType>("auth/login", params)
  },
  logout() {
    return instance.delete<BaseResponseType>("auth/login")
  },

  getTodolists() {
    return instance.get<TodolistServerType[]>("todo-lists")
  },
  createTodolist(title: string) {
    return instance.post<BaseResponseType<{ item: TodolistServerType }>>("todo-lists", { title: title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${id}`)
  },
  updateTodolist(id: string, title: string) {
    return instance.put<BaseResponseType>(`todo-lists/${id}`, { title: title })
  },

  getTasks(todolistId: string) {
    return instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return (
      instance
        // если надо указать типизацию третьего параметра, то надо указывать все три (но чаще хватит только первого)
        // при указании второго и третьего параметра, типизация первого игнорируется в пользу второго
        .post<
          BaseResponseType<{ item: TaskType }>,
          AxiosResponse<BaseResponseType<{ item: TaskType }>>,
          { title: string }
        >(`todo-lists/${todolistId}/tasks/`, { title: title })
    )
  },
  deleteTask(todolistId: string, id: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${id}`)
  },
  updateTask(todolistId: string, id: string, updateTask: UpdateServerTaskType) {
    return instance.put<BaseResponseType>(`todo-lists/${todolistId}/tasks/${id}`, updateTask)
  },
}

// types

export type TodolistServerType = {
  id: string
  title: string
  addedDate: Date
  order: number
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
export type UpdateServerTaskType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: Date | null
  deadline: Date | null
}

export type BaseResponseType<T = {}> = {
  resultCode: resultCode
  messages: string[]
  data: T
  fieldsErrors?: FieldErrorType[]
}
export type ResponseTasksType = {
  items: TaskServerType[]
  totalCount: number
  error: string
}
export type ResponseMeType = {
  id: number
  email: string
  login: string
}
export type ResponseLoginType = {
  data: {}
  messages: string[]
  fieldsErrors: FieldErrorType[]
  resultCode: resultCode
}
export type FieldErrorType = {
  field: string
  error: string
}
export type LoginParamsType = {
  email?: string
  password?: string
  rememberMe?: boolean
  captcha?: string
}
