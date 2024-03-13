import {setErrorAC, setStatusAC} from '../app_and_store/AppReducer';
import {AppDispatchType, StoreReducerActionType} from '../app_and_store/Store';
import {ResponseType} from '../api/todolists-api'

export const ServerErrorHandler = (res: ResponseType, dispatch: AppDispatchType) => {
    if (res.messages.length){
        dispatch(setErrorAC(res.messages[0]))
        dispatch(setStatusAC('failed'))
    } else {
        dispatch(setErrorAC('some application error'))
        dispatch(setStatusAC('failed'))
    }
}

export const NetWorkErrorHandler = (error: {messages: string}, dispatch: AppDispatchType) => {
    dispatch(setErrorAC(error.messages ? error.messages : 'some NetWork error'))
    dispatch(setStatusAC('failed'))
}