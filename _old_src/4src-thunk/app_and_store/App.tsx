import React, { FC, memo } from "react"
import "./App.css"
import ButtonAppBar from "../features/buttonAppBar/ButtonAppBar"
import { PageTodoLists } from "../features/pageTodolists/PageTodoLists"

export const App: FC = memo(() => {
  return (
    <div className="App">
      <ButtonAppBar />
      <PageTodoLists />
    </div>
  )
})
