import React from "react"
import s from "common/components/error404/Error.module.css"
import { setAppErrorPageAC, setAppStatusAC } from "app/AppReducer"
import { useAppDispatch, useAppSelector } from "app/Store"
import { Navigate } from "react-router-dom"
import img404 from "assets/bgE.jpg"
import { errorPageAppSelector, isLoggedInSelector } from "common/selectors"

export const Error404 = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const errorPage = useAppSelector(errorPageAppSelector)

  dispatch(setAppStatusAC({ status: "failed" }))

  if (errorPage && !isLoggedIn) {
    dispatch(setAppErrorPageAC({ errorPage: false }))
    return <Navigate to="/login" />
  } else if (errorPage && isLoggedIn) {
    dispatch(setAppErrorPageAC({ errorPage: false }))
    return <Navigate to="/todolists" />
  }

  return (
    <div className={s.main}>
      <h2 className={s.text}>{`CLICK BACK`}</h2>
      <img src={img404} alt="" />
    </div>
  )
}
