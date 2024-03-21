import React from 'react'
import s from './Error.module.css';
import {setAppStatusAC, setAppTimeoutAC} from '../../app_and_store/AppReducer';
import {useAppDispatch, useAppSelector} from '../../app_and_store/Store';
import {Navigate} from 'react-router-dom';
import img404 from '../../assets/bgE.jpg'

export const Error404 = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const timeout = useAppSelector(state => state.app.timeout)
    dispatch(setAppStatusAC('failed'))
    setTimeout(() => {
        dispatch(setAppTimeoutAC(true))
    }, 5000)

    if (timeout && !isLoggedIn) {
        dispatch(setAppTimeoutAC(false))
        return <Navigate to="/login"/>
    } else if (timeout && isLoggedIn){
        dispatch(setAppTimeoutAC(false))
        return <Navigate to="/todolists"/>
    }

    return (
        <>

            <div className={s.main}>
                <h2 className={s.text}>WAIT 5 SECONDS</h2>
                <img src={img404} alt=''/>
            </div>
        </>

    )
}