import axios from 'axios'

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

export type TodoListType = {
    id:string
    title:string
    addedDate:string
    order:number
}
type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}
export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type ResponseTaskType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export const todolistsAPI = {
    getTodolists() {
        return instanse.get<TodoListType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instanse.post<ResponseType<{item: TodoListType}>>('todo-lists', {title: title})
    },
    deleteTodolist(id: string) {
        return instanse.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instanse.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instanse.get<ResponseTaskType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, id: string) {
        return instanse.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`)
    }
}