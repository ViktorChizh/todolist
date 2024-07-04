import React, { useEffect } from "react"
import { Container, Grid, Paper } from "@mui/material"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import { Todolist } from "./todolist/Todolist"
import { useAppSelector } from "app/Store"
import { Navigate } from "react-router-dom"
import { isLoggedInSelector, todolistsSelector } from "common/selectors"
import { useActions } from "common/hooks"

type Props = {demo?: boolean}

export const PageTodoLists = ({ demo = false }: Props) => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const todoLists = useAppSelector(todolistsSelector)
  const { addTodolistTC: addTodoList, setTodolistTC: setTodolist } = useActions()

  const addTodolist = async (title: string) => addTodoList(title).unwrap()

  useEffect(() => {
    if (demo || !isLoggedIn) return
    setTodolist()
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <Container fixed style={{ maxWidth: "100%", padding: '0' }}>
      <Grid container >
        <Paper elevation={5} style={{ width: "100%", padding: "20px  6px 20px 20px", margin: "20px 0" }}>
          <h3 style={{ textAlign: "center" }}>Add Todolist</h3>
          <AddItemForm
            callBack={addTodolist}
            placeholder={"add new todolist"}
            style={{ width: "100%", maxWidth: "100%" }}
          />
          {!todoLists.length && (
            <span style={{ color: "red", display: "block", marginTop: "15px"}}>
              <b><i>TodoLists are empty</i></b>
            </span>
          )}
        </Paper>
      </Grid>
      <Grid container style={{padding: "10px", flexWrap: "nowrap", overflowX: "auto", gap: "10px" }}>
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
