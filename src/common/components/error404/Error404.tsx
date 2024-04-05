import React from "react"
import s from "common/components/error404/Error.module.css"
import { errorPageAppSelector, setAppErrorPage, setAppStatus } from "app_and_store/AppReducer"
import { useAppDispatch, useAppSelector } from "app_and_store/Store"
import { Navigate } from "react-router-dom"
import img404 from "_assets/bgE.jpg"
import { isLoggedInSelector } from "features/auth/authReducer"

export const Error404 = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const errorPage = useAppSelector(errorPageAppSelector)

  dispatch(setAppStatus({ status: "failed" }))

  if (errorPage && !isLoggedIn) {
    dispatch(setAppErrorPage({ errorPage: false }))
    return <Navigate to="/login" />
  } else if (errorPage && isLoggedIn) {
    dispatch(setAppErrorPage({ errorPage: false }))
    return <Navigate to="/todolists" />
  }

  return (
    <div className={s.main}>
      <h2 className={s.text}>{`CLICK BACK`}</h2>
      <img src={img404} alt="" />
    </div>
  )
}
