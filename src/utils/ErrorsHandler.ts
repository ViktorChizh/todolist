import { setAppErrorAC, setAppStatusAC } from "../app_and_store/AppReducer"
import { AppDispatchType } from "../app_and_store/Store"
import { ResponseType } from "../api/api"
import { put } from "redux-saga/effects"

export const ServerErrorHandler = <T={}>(res: ResponseType<T>, dispatch: AppDispatchType) => {
    if (res.messages.length){
        dispatch(setAppErrorAC(res.messages[0]))
    } else {
        dispatch(setAppErrorAC('some application error'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const NetWorkErrorHandler = (e: _ErrorType, dispatch: AppDispatchType) => {
    dispatch(setAppErrorAC(e.message))
    dispatch(setAppStatusAC('failed'))
}

export function* NetWorkErrorHandlerSaga(e: _ErrorType){
    yield put(setAppErrorAC(e.message))
    yield put(setAppStatusAC('failed'))
}

export function* ServerErrorHandlerSaga<T={}>(res: ResponseType<T>){
    if (!!res.messages.length){
        yield put(setAppErrorAC(res.messages[0]))
    } else {
        yield put(setAppErrorAC('some application error'))
    }
    yield put(setAppStatusAC('failed'))
}

type _ErrorType = {message: string}
