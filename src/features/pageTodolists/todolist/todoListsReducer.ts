import {api, TodolistServerType} from '../../../api/todolists-api';
import {Dispatch} from 'redux';

export const todoListsReducer = (state = [] as TodolistType[], action: TodoListsReducerActionType): TodolistType[] => {
    switch (action.type) {
        case 'SET-TODOLIST':
            return action.payload.todolists.map(tl => ({...tl, filter: 'all'}))
        case 'ADD-TODOLIST':
            return [...state, {...action.payload.todolist, filter: 'all'}]
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'UPDATE-TODOLIST':
            return state.map(tl => tl.id === action.payload.idTDL ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-FILTER':
            return state.map(tl => tl.id === action.payload.idTDL ? {...tl, filter: action.payload.value} : tl)
        default:
            return state
    }
}
// types
export type TodoListsReducerActionType =
    | removeTodolistACType
    | addTodolistACType
    | setTodolistACType
    | ReturnType<typeof updateTodolistAC>
    | ReturnType<typeof changeFilterAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type setTodolistACType = ReturnType<typeof setTodolistAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = TodolistServerType & { filter: FilterValuesType }
// actions
export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE-TODOLIST' as const,
    payload: {id}
})
export const addTodolistAC = (todolist: TodolistServerType) => ({
    type: 'ADD-TODOLIST' as const,
    payload: {todolist}
})
export const setTodolistAC = (todolists: TodolistServerType[]) => ({
    type: 'SET-TODOLIST' as const,
    payload: {todolists}
})
export const updateTodolistAC = (idTDL: string, title: string) => ({
    type: 'UPDATE-TODOLIST' as const,
    payload: {idTDL, title}
})
export const changeFilterAC = (idTDL: string, value: FilterValuesType) => ({
    type: 'CHANGE-FILTER' as const,
    payload: {idTDL, value}
})
//thunks
export const setTodolistTC = () => (dispatch: Dispatch<TodoListsReducerActionType>) => {
    api.getTodolists()
        .then(res => dispatch(setTodolistAC(res.data)))
}
export const removeTodolistTC = (idTDL: string) => (dispatch: Dispatch<TodoListsReducerActionType>) => {
    api.deleteTodolist(idTDL)
        .then(_ => dispatch(removeTodolistAC(idTDL)))
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodoListsReducerActionType>) => {
    api.createTodolist(title)
        .then(res => dispatch(addTodolistAC(res.data.data.item)))
}
export const updateTodolistTC = (idTDL: string, title: string) => (dispatch: Dispatch<TodoListsReducerActionType>) => {
    api.updateTodolist(idTDL, title)
        .then(_ => dispatch(updateTodolistAC(idTDL, title)))
}