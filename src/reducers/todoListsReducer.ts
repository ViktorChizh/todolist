import {api, TodolistServerType} from '../api/todolists-api';
import {Dispatch} from 'redux';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = TodolistServerType & { filter: FilterValuesType }
const initialState: TodolistType[] = []

export const todoListsReducer = (state = initialState, action: TodoListsReducerActionType): TodolistType[] => {
    switch (action.type) {
        case 'SET-TODOLIST': {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        case 'ADD-TODOLIST': {
            return [...state, {...action.payload.tdl, filter: 'all'}]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
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

export type TodoListsReducerActionType = removeTodolistACType | addTodolistACType | setTodolistACType
    | ReturnType<typeof updateTodolistAC> | ReturnType<typeof changeFilterAC>

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type setTodolistACType = ReturnType<typeof setTodolistAC>

export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE-TODOLIST' as const,
    payload: {id}
})
export const addTodolistAC = (tdl: TodolistServerType) => ({
    type: 'ADD-TODOLIST' as const,
    payload: {tdl}
})
export const setTodolistAC = (todolists: TodolistServerType[]) => ({
    type: 'SET-TODOLIST' as const,
    payload: {todolists}
})
export const updateTodolistAC = (id: string, title: string) => ({
    type: 'UPDATE-TODOLIST' as const,
    payload: {id, title}
})
export const changeFilterAC = (id: string, value: FilterValuesType) => ({
    type: 'CHANGE-FILTER' as const,
    payload: {id, value}
})

export const fetchTodolistTC = () => {
    return (dispatch: Dispatch) => {
        api.getTodolists()
            .then(res => dispatch(setTodolistAC(res.data)))
    }
}
export const removeTodolistTC = (idTDL: string) => {
    return (dispatch: Dispatch) => {
        api.deleteTodolist(idTDL)
            .then(res => dispatch(removeTodolistAC(idTDL)))
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        api.createTodolist(title)
            .then(res => dispatch(addTodolistAC(res.data.data.item)))
    }
}
export const updateTodolistTC = (idTDL: string, title: string) => {
    return (dispatch: Dispatch) => {
        api.updateTodolist(idTDL, title)
            .then(res => dispatch(updateTodolistAC(idTDL, title)))
    }
}