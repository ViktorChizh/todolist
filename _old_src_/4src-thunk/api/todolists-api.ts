import axios, { AxiosResponse } from "axios"

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "48b5fe2e-10a0-4ad2-b6ed-950dedf8110b",
  },
}
const instanse = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
})
export type TodolistServerType = {
  id: string
  title: string
  addedDate: Date
  order: number
}
type ResponseType<T = {}> = {
  resultCode: number
  messages: string[]
  data: T
}

export enum status {
  new = 0,
  completed = 1,
}
export enum priority {
  low = 0,
  normal = 1,
  hi = 2,
}

export type TaskType = {
  description: string
  title: string
  status: status
  priority: priority
  startDate: Date | null
  deadline: Date | null
  id: string
  todoListId: string
  order: number
  addedDate: Date
}
export type UpdateServerTaskType = {
  title: string
  description: string
  status: status
  priority: priority
  startDate: Date | null
  deadline: Date | null
}
type ResponseTasksType = {
  items: TaskType[]
  totalCount: number
  error: string
}

export const api = {
  getTodolists() {
    return instanse.get<TodolistServerType[]>("todo-lists")
  },
  createTodolist(title: string) {
    return instanse.post<ResponseType<{ item: TodolistServerType }>>("todo-lists", { title: title })
  },
  deleteTodolist(id: string) {
    return instanse.delete<ResponseType>(`todo-lists/${id}`)
  },
  updateTodolist(id: string, title: string) {
    return instanse.put<ResponseType>(`todo-lists/${id}`, { title: title })
  },

  getTasks(todolistId: string) {
    return instanse.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
  },
  // если надо указать типизацию третьего параметра, то надо указывать все три (но чаще хватит только первого)
  // при указании второго и третьего параметра, типизация первого игнорируется в пользу второго
  createTask(todolistId: string, title: string) {
    return instanse.post<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      { title: string }
    >(`todo-lists/${todolistId}/tasks/`, { title: title })
  },
  deleteTask(todolistId: string, id: string) {
    return instanse.delete<TaskType>(`todo-lists/${todolistId}/tasks/${id}`)
  },
  updateTask(todolistId: string, id: string, updateTask: UpdateServerTaskType) {
    return instanse.put<TaskType>(`todo-lists/${todolistId}/tasks/${id}`, updateTask)
  },
}
