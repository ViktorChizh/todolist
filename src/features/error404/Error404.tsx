import React from "react"
import img404 from "assets/bgE.jpg"
import { Navigate } from "react-router-dom"
import s from "features/error404/Error.module.css"
import { errorPageAppSelector, isLoggedInSelector } from "common/selectors"
import { useActions, useAppSelector } from "common/hooks"

export const Error404 = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const errorPage = useAppSelector(errorPageAppSelector)
  const { setAppErrorPageAC } = useActions()

  if (errorPage && !isLoggedIn) {
    setAppErrorPageAC({ errorPage: false })
    return <Navigate to="/login" />
  } else if (errorPage && isLoggedIn) {
    setAppErrorPageAC({ errorPage: false })
    return <Navigate to="/todolists" />
  }

  return (
    <div className={s.main}>
      <h2 className={s.text}>{`CLICK BACK`}</h2>
      <img src={img404} alt="" />
    </div>
  )
}
