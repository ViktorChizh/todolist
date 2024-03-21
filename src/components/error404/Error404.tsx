import React from 'react'
import s from './Error.module.css';
import {setAppStatusAC, setAppTimeoutAC} from '../../app_and_store/AppReducer';
import {useAppDispatch, useAppSelector} from '../../app_and_store/Store';
import {Navigate} from 'react-router-dom';
import img404 from '../../_assets/bgE.jpg'

export const Error404 = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const errorPageTimeout = useAppSelector(state => state.app.errorPageTimeout)
    let t // ввожу переменную, чтобы сохранять установленное в AppReducer время отображения страницы Error404
    if(errorPageTimeout) t=errorPageTimeout
    dispatch(setAppStatusAC('failed'))
    setTimeout(() => {
        dispatch(setAppTimeoutAC(0))
    }, errorPageTimeout)

    if (!errorPageTimeout && !isLoggedIn) {
        dispatch(setAppTimeoutAC(t))
        return <Navigate to="/login"/>
    } else if (!errorPageTimeout && isLoggedIn) {
        dispatch(setAppTimeoutAC(t))
        return <Navigate to="/todolists"/>
    }

    return (
        <div className={s.main}>
            <h2 className={s.text}>{t ? `WAIT ${t/1000} SECONDS` : ''}</h2>
            <img src={img404} alt=""/>
        </div>
    )
}