import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

const initialState: TodolistType[] = []

export const todoListsReducer = (state = initialState, action: TodoListsReducerActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.payload.id, title: action.payload.title, filter: 'all'}]
        }
        case 'UPDATE-TODOLIST': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }
        case 'CHANGE-FILTER': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.value} : tl)
        }
        default:
            return state
    }
}

export type TodoListsReducerActionType = removeTodolistACType | addTodolistACType
    | ReturnType<typeof updateTodolistAC> | ReturnType<typeof changeFilterAC>

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE-TODOLIST' as const,
    payload: {id}
})

export type addTodolistACType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (title: string) => ({
    type: 'ADD-TODOLIST' as const,
    payload: {id: v1(), title}
})

export const updateTodolistAC = (id: string, title: string) => ({
    type: 'UPDATE-TODOLIST' as const,
    payload: {id, title}
})

export const changeFilterAC = (id: string, value: FilterValuesType) => ({
    type: 'CHANGE-FILTER' as const,
    payload: {id, value}
})