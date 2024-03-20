import axios, {AxiosResponse} from 'axios'
import {StatusType} from '../app_and_store/AppReducer';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '48b5fe2e-10a0-4ad2-b6ed-950dedf8110b'
    }
}
const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const api = {
    me() {
        return instanse.get<ResponseType<ResponseMeType>>('auth/me')
    },
    login(params: LoginParamsType) {
        return instanse.post<ResponseType<{userId: number}>>('auth/login', params)
    },
    logout() {
        return instanse.delete<ResponseType>('auth/login')
    },

    getTodolists() {
        return instanse.get<TodolistServerType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instanse.post<ResponseType<{ item: TodolistServerType }>>('todo-lists', {title: title})
    },
    deleteTodolist(id: string) {
        return instanse.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instanse.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },

    getTasks(todolistId: string) {
        return instanse.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instanse
            // если надо указать типизацию третьего параметра, то надо указывать все три (но чаще хватит только первого)
            // при указании второго и третьего параметра, типизация первого игнорируется в пользу второго
            .post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>
            (`todo-lists/${todolistId}/tasks/`, {title: title})
    },
    deleteTask(todolistId: string, id: string) {
        return instanse.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`)
    },
    updateTask(todolistId: string, id: string, updateTask: UpdateServerTaskType) {
        return instanse.put<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`, updateTask)
    }
}

//enums
export enum status {
    new = 0,
    completed = 1
}
export enum priority {
    low = 0,
    normal = 1,
    hi = 2
}
export enum resultCode {
    SUCCEEDED = 0,
    ERROR = 1,
    CAPTCHA_ERROR = 10
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
export type TaskType = TaskServerType & { taskStatus: StatusType }
export type UpdateServerTaskType = {
    title: string
    description: string
    status: status
    priority: priority
    startDate: Date | null
    deadline: Date | null
}
export type ResponseTasksType = {
    items: TaskServerType[]
    totalCount: number
    error: string
}
export type ErrorType = {
    'statusCode': number,
    'messages': [
        {
            'message': string,
            'field': string
        }
    ],
    'error': string
}