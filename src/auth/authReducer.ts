import {AppReducerActionType, setAppIsInitializedAC, setAppStatusAC} from '../app_and_store/AppReducer';
import {api, ErrorType, LoginParamsType, ResponseMeType, resultCode} from '../api/api';
import {NetWorkErrorHandler, ServerErrorHandler} from '../utils/ErrorsHandler';
import axios from 'axios';
import {cleanTodolistAC} from '../features/pageTodolists/todolist/TodoListsReducer';
import {AppThunkType} from '../app_and_store/Store';
import {cleanTasksAC} from '../features/pageTodolists/todolist/task/TasksReducer';

const initialState = {isLoggedIn: false}

export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// types
type InitialStateType = typeof initialState
export type AuthReducerActionsType =ReturnType<typeof setIsLoggedInAC> | AppReducerActionType
// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'auth/SET-IS-LOGGED-IN', value} as const)
// thunks
export const meTC = (): AppThunkType  => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await api.me()
        dispatch(setAppIsInitializedAC(true))
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {
            ServerErrorHandler<ResponseMeType>(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            NetWorkErrorHandler(e, dispatch)
        } else {
            NetWorkErrorHandler(e as Error, dispatch)
        }
    }
}
export const loginTC = (params: LoginParamsType): AppThunkType  => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await api.login(params)
        if (res.data.resultCode === resultCode.SUCCEEDED) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            ServerErrorHandler<{ userId: number }>(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            NetWorkErrorHandler(e, dispatch)
        } else {
            NetWorkErrorHandler(e as Error, dispatch)
        }
    }
}
export const logoutTC = (): AppThunkType  => async dispatch => {
    try {
        let res = await api.logout()
        if (res.data.resultCode === resultCode.SUCCEEDED) {
            dispatch(setIsLoggedInAC(false))
            dispatch(cleanTodolistAC())
            dispatch(cleanTasksAC())
        } else {
            ServerErrorHandler(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            NetWorkErrorHandler(e, dispatch)
        } else {
            NetWorkErrorHandler(e as Error, dispatch)
        }
    }
}