import {api, TodolistServerType} from '../../../api/todolists-api';
import {Dispatch} from 'redux';
import {AppReducerActionType, setErrorAC, setStatusAC, StatusType} from '../../../app_and_store/AppReducer';
import {NetWorkErrorHandler, ServerErrorHandler} from '../../../utility/ErrorsHandler';

export const todoListsReducer = (state = [] as TodolistType[], action: TodoListsReducerActionType): TodolistType[] => {
    switch (action.type) {
        case 'SET-TODOLIST':
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', todoStatus: 'idle'}))
        case 'ADD-TODOLIST':
            return [...state, {...action.payload.todolist, filter: 'all', todoStatus: 'idle'}]
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'UPDATE-TODOLIST':
            return state.map(tl => tl.id === action.payload.idTDL ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-FILTER':
            return state.map(tl => tl.id === action.payload.idTDL ? {...tl, filter: action.payload.value} : tl)
        case 'CHANGE-TODOSTATUS':
            return state.map(tl => tl.id === action.payload.idTDL ? {...tl, todoStatus: action.payload.todoStatus} : tl)
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
    | ReturnType<typeof changeTodoStatusAC>
    | AppReducerActionType
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type setTodolistACType = ReturnType<typeof setTodolistAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = TodolistServerType & { filter: FilterValuesType, todoStatus: StatusType }
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
export const changeTodoStatusAC = (idTDL: string, todoStatus: StatusType) => ({
    type: 'CHANGE-TODOSTATUS' as const,
    payload: {idTDL, todoStatus}
})
//thunks
export const setTodolistTC = () => (dispatch: Dispatch<TodoListsReducerActionType>) => {
    dispatch(setStatusAC('loading'))
    setTimeout(() => {
        api.getTodolists()
            .then(res => {
                dispatch(setTodolistAC(res.data))
                dispatch(setStatusAC('successed'))
            })
            .catch(error => {
                NetWorkErrorHandler(error, dispatch)
            })
    }, 1000)

}
export const removeTodolistTC = (idTDL: string) => (dispatch: Dispatch<TodoListsReducerActionType>) => {
    dispatch(setStatusAC('loading'))
    setTimeout(() => {
        api.deleteTodolist(idTDL)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(idTDL))
                    dispatch(setStatusAC('successed'))
                } else {
                    ServerErrorHandler(res.data, dispatch)
                }
            })
            .catch(error => {
                NetWorkErrorHandler(error, dispatch)
            })
    }, 1000)
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodoListsReducerActionType>) => {
    dispatch(setStatusAC('loading'))
    setTimeout(() => {
        api.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setStatusAC('successed'))
                } else {
                    ServerErrorHandler(res.data, dispatch)
                }
            })
            .catch(error => {
                NetWorkErrorHandler(error, dispatch)
            })
    }, 1000)
}
export const updateTodolistTC = (idTDL: string, title: string) => (dispatch: Dispatch<TodoListsReducerActionType>) => {
    dispatch(setStatusAC('loading'))
    setTimeout(() => {
        api.updateTodolist(idTDL, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTodolistAC(idTDL, title))
                    dispatch(setStatusAC('successed'))
                } else {
                    ServerErrorHandler(res.data, dispatch)
                }
            })
            .catch(error => {
                NetWorkErrorHandler(error, dispatch)
            })
    }, 1000)
}