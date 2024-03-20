import {api, ErrorType, resultCode, TodolistServerType} from '../../../api/api';
import {AppReducerActionType, setAppStatusAC, StatusType} from '../../../app_and_store/AppReducer';
import {NetWorkErrorHandler, ServerErrorHandler} from '../../../utils/ErrorsHandler';
import {AppThunkType} from '../../../app_and_store/Store';
import axios from 'axios';
import {fetchTasksTC} from './task/TasksReducer';

export const todoListsReducer = (state = [] as TodolistType[], action: TodoListsReducerActionType): TodolistType[] => {
    switch (action.type) {
        case 'todolist/SET-TODOLIST':
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', todoStatus: 'idle'}))
        case 'todolist/ADD-TODOLIST':
            return [...state, {...action.payload.todolist, filter: 'all', todoStatus: 'idle'}]
        case 'todolist/REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'todolist/UPDATE-TODOLIST':
            return state.map(tl => tl.id === action.payload.idTDL ? {...tl, title: action.payload.title} : tl)
        case 'todolist/CHANGE-FILTER':
            return state.map(tl => tl.id === action.payload.idTDL ? {...tl, filter: action.payload.value} : tl)
        case 'todolist/CHANGE-TODOSTATUS':
            return state.map(tl => tl.id === action.payload.idTDL ? {...tl, todoStatus: action.payload.todoStatus} : tl)
        case 'todolist/CLEAN-TODOLISTS':
            return []
        default:
            return state
    }
}
// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = TodolistServerType & { filter: FilterValuesType, todoStatus: StatusType }
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type setTodolistACType = ReturnType<typeof setTodolistAC>
export type TodoListsReducerActionType =
    | removeTodolistACType
    | addTodolistACType
    | setTodolistACType
    | ReturnType<typeof updateTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeTodoStatusAC>
    | ReturnType<typeof cleanTodolistAC>
    | AppReducerActionType
// actions
export const removeTodolistAC = (id: string) => ({
    type: 'todolist/REMOVE-TODOLIST' as const,
    payload: {id}
})
export const addTodolistAC = (todolist: TodolistServerType) => ({
    type: 'todolist/ADD-TODOLIST' as const,
    payload: {todolist}
})
export const setTodolistAC = (todolists: TodolistServerType[]) => ({
    type: 'todolist/SET-TODOLIST' as const,
    payload: {todolists}
})
export const updateTodolistAC = (idTDL: string, title: string) => ({
    type: 'todolist/UPDATE-TODOLIST' as const,
    payload: {idTDL, title}
})
export const changeFilterAC = (idTDL: string, value: FilterValuesType) => ({
    type: 'todolist/CHANGE-FILTER' as const,
    payload: {idTDL, value}
})
export const changeTodoStatusAC = (idTDL: string, todoStatus: StatusType) => ({
    type: 'todolist/CHANGE-TODOSTATUS' as const,
    payload: {idTDL, todoStatus}
})
export const cleanTodolistAC = () => ({type: 'todolist/CLEAN-TODOLISTS' as const})
//thunks
export const setTodolistTC = (): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    setTimeout(async () => {
        try {
            let res = await api.getTodolists()
            dispatch(setTodolistAC(res.data))
            res.data.forEach(tl => dispatch(fetchTasksTC(tl.id)))
            dispatch(setAppStatusAC('succeeded'))
        } catch
            (e) {
            if (axios.isAxiosError<ErrorType>(e)) {
                NetWorkErrorHandler(e, dispatch)
            } else {
                NetWorkErrorHandler(e as Error, dispatch)
            }
        }
    }, 1000)
}
export const removeTodolistTC = (idTDL: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodoStatusAC(idTDL, 'loading'))
    setTimeout(async () => {
        try {
            let res = await api.deleteTodolist(idTDL)
            if (res.data.resultCode === resultCode.SUCCEEDED) {
                dispatch(removeTodolistAC(idTDL))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                ServerErrorHandler(res.data, dispatch)
                dispatch(changeTodoStatusAC(idTDL, 'failed'))
            }
        } catch (e) {
            if (axios.isAxiosError<ErrorType>(e)) {
                NetWorkErrorHandler(e, dispatch)
            } else {
                NetWorkErrorHandler(e as Error, dispatch)
            }
            dispatch(changeTodoStatusAC(idTDL, 'failed'))
        }
    }, 1000)
}
export const addTodolistTC = (title: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    setTimeout(async () => {
        try {
            let res = await api.createTodolist(title)
            if (res.data.resultCode === resultCode.SUCCEEDED) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                ServerErrorHandler<{ item: TodolistServerType }>(res.data, dispatch)
            }
        } catch (e) {
            if (axios.isAxiosError<ErrorType>(e)) {
                NetWorkErrorHandler(e, dispatch)
            } else {
                NetWorkErrorHandler(e as Error, dispatch)
            }
        }
    }, 1000)
}
export const updateTodolistTC = (idTDL: string, title: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodoStatusAC(idTDL, 'loading'))
    setTimeout(async () => {
        try {
            let res = await api.updateTodolist(idTDL, title)
            if (res.data.resultCode === resultCode.SUCCEEDED) {
                dispatch(updateTodolistAC(idTDL, title))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodoStatusAC(idTDL, 'succeeded'))
            } else {
                ServerErrorHandler(res.data, dispatch)
                dispatch(changeTodoStatusAC(idTDL, 'failed'))
            }
        } catch (e) {
            if (axios.isAxiosError<ErrorType>(e)) {
                NetWorkErrorHandler(e, dispatch)
            } else {
                NetWorkErrorHandler(e as Error, dispatch)
            }
            dispatch(changeTodoStatusAC(idTDL, 'failed'))
        }
    }, 1000)
}
