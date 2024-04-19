import React, { useEffect } from "react"
import "./App.css"
import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import LinearProgress from "@mui/material/LinearProgress"
import { CircularProgress, Container } from "@mui/material"
import { ErrorSnackBar } from "common/components/errorSnackBar/ErrorSnackBar"
import { Error404 } from "features/error404/Error404"
import ButtonAppBar from "features/buttonAppBar/ButtonAppBar"
import { PageTodoLists } from "features/pageTodolists/PageTodoLists"
import { Login } from "features/login/Login"
import { isInitializedAppSelector, statusAppSelector } from "common/selectors"
import { useActions, useAppSelector } from "common/hooks"

type Props = { demo?: boolean }

export const App = ({ demo = false }: Props) => {
  const status = useAppSelector(statusAppSelector)
  const isInitialized = useAppSelector(isInitializedAppSelector)
  const { meTC: me } = useActions()
  useEffect(() => {
    me()
  }, [])
  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <HashRouter>
      <div className="App">
        <ButtonAppBar />
        {status === "loading" && <LinearProgress color="error" />}
        <Container fixed style={{ margin: "0", padding: "0", width: "100%", maxWidth: "100%" }}>
          <Routes>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/1-todolist"} element={<Navigate to={"/todolists"} />} />
            <Route path={"/"} element={<Navigate to={"/todolists"} />} />
            <Route path={"/todolists"} element={<PageTodoLists demo={demo} />} />
            <Route path={"/error404"} element={<Error404 />} />
            <Route path={"*"} element={<Navigate to={"/error404"} />} />
          </Routes>
        </Container>
        <ErrorSnackBar />
      </div>
    </HashRouter>
  )
}
