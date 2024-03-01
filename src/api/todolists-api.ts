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
    addedDate: Date
    order:number
}
type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}
export type TaskType = {
    description?: string
    title: string
    status?: number
    priority?: number
    startDate?: Date
    deadline?: Date
    id?: string
    todoListId?: string
    order?: number
    addedDate?: Date
}
type ResponseTasksType= {
    items: TaskType[]
    totalCount: number
    error: string
}

export const api = {
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
        return instanse.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instanse.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/`, {title: title})
    },
    deleteTask(todolistId: string, id: string) {
        return instanse.delete<TaskType>(`todo-lists/${todolistId}/tasks/${id}`)
    },
    updateTask(todolistId: string, id: string, title: string) {
        return instanse.put<TaskType>(`todo-lists/${todolistId}/tasks/${id}`, {title: title})
    }
}