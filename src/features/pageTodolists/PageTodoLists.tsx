import React from "react"
import { Container, Grid, Paper } from "@mui/material"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import { Todolist } from "./todolist/Todolist"
import { usePageTodoList } from "./usePageTodoList"
import { useAppSelector } from "app/Store"
import { Navigate } from "react-router-dom"
import { isLoggedInSelector } from "common/selectors"

type Props = {
  demo?: boolean
}

export const PageTodoLists = ({ demo = false }: Props) => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  let { todoLists, addTodolist } = usePageTodoList(demo)
  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <Container fixed style={{ maxWidth: "100%" }}>
      <Grid container>
        <Paper elevation={5} style={{ width: "100%", padding: "20px  6px 20px 20px", margin: "20px auto" }}>
          <h3 style={{ textAlign: "center" }}>Add Todolist</h3>
          <AddItemForm
            callBack={addTodolist}
            placeholder={"add new todolist"}
            style={{ width: "100%", maxWidth: "100%" }}
          />
          {!todoLists.length && (
            <span
              style={{ color: "red", display: "block", marginTop: "15px", fontWeight: "bold", fontStyle: "italic" }}>
              TodoLists are empty
            </span>
          )}
        </Paper>
      </Grid>
      <Grid
        container
        style={{ width: "100%", height: "380px", padding: "10px", flexWrap: "nowrap", overflowX: "auto", gap: "10px" }}>
        {todoLists.map((tl) => {
          return (
            <Grid key={tl.id} style={{ margin: "0 auto" }}>
              <Paper elevation={5} style={{ padding: "10px" }}>
                <Todolist todoList={tl} />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
