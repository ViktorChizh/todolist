import React from "react"
import img404 from "assets/bgE.jpg"
import s from "features/error404/Error.module.css"

export const Error404 = () => {

  return (
    <div className={s.main}>
      <h2 className={s.text}>{`CLICK BACK`}</h2>
      <img src={img404} alt="" />
    </div>
  )
}
