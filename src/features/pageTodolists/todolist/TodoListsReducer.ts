import { api, ErrorType, resultCode, TodolistServerType } from "api/api"
import { setAppStatusAC, StatusType } from "app_and_store/AppReducer"
import { NetWorkErrorHandler, ServerErrorHandler } from "utils/ErrorsHandler"
import axios from "axios"
import { fetchTasksTC } from "./task/TasksReducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistType[],
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ idTDL: string }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.idTDL)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistServerType }>) {
      state.unshift({ ...action.payload.todolist, filter: "all", todoStatus: "idle" })
    },
    setTodolistAC(_, action: PayloadAction<{ todolists: TodolistServerType[] }>) {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", todoStatus: "idle" }))
    },
    changeTodoTitleAC(state, action: PayloadAction<{ idTDL: string; title: string }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.idTDL)
      state[index].title = action.payload.title
    },
    changeTodoFilterAC(state, action: PayloadAction<{ idTDL: string; filter: FilterValuesType }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.idTDL)
      state[index].filter = action.payload.filter
    },
    changeTodoStatusAC(state, action: PayloadAction<{ idTDL: string; todoStatus: StatusType }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.idTDL)
      state[index].todoStatus = action.payload.todoStatus
    },
    cleanTodolistAC() {
      return [] as TodolistType[]
    },
  },
})

export const todoListsReducer = slice.reducer
export const {
  removeTodolistAC,
  addTodolistAC,
  setTodolistAC,
  changeTodoTitleAC,
  changeTodoFilterAC,
  changeTodoStatusAC,
  cleanTodolistAC,
} = slice.actions

//types
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = TodolistServerType & { filter: FilterValuesType; todoStatus: StatusType }

//thunks
export const setTodolistTC = () => (dispatch: any) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  setTimeout(async () => {
    try {
      let res = await api.getTodolists()
      dispatch(setTodolistAC({ todolists: res.data }))
      res.data.forEach((tl) => dispatch(fetchTasksTC(tl.id)))
      dispatch(setAppStatusAC({ status: "succeeded" }))
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        NetWorkErrorHandler(e, dispatch)
      } else {
        NetWorkErrorHandler(e as Error, dispatch)
      }
    }
  }, 1000)
}
export const removeTodolistTC = (idTDL: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  dispatch(changeTodoStatusAC({ idTDL, todoStatus: "loading" }))
  setTimeout(async () => {
    try {
      let res = await api.deleteTodolist(idTDL)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(removeTodolistAC({ idTDL }))
        dispatch(setAppStatusAC({ status: "succeeded" }))
      } else {
        ServerErrorHandler(res.data, dispatch)
        dispatch(changeTodoStatusAC({ idTDL, todoStatus: "failed" }))
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        NetWorkErrorHandler(e, dispatch)
      } else {
        NetWorkErrorHandler(e as Error, dispatch)
      }
      dispatch(changeTodoStatusAC({ idTDL, todoStatus: "failed" }))
    }
  }, 1000)
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  setTimeout(async () => {
    try {
      let res = await api.createTodolist(title)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(addTodolistAC({ todolist: res.data.data.item }))
        dispatch(setAppStatusAC({ status: "succeeded" }))
      } else {
        ServerErrorHandler<{ item: TodolistServerType }>(res.data, dispatch)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        NetWorkErrorHandler(e, dispatch)
      } else {
        NetWorkErrorHandler(e as Error, dispatch)
      }
    }
  }, 1000)
}
export const updateTodolistTC = (idTDL: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  dispatch(changeTodoStatusAC({ idTDL, todoStatus: "loading" }))
  setTimeout(async () => {
    try {
      let res = await api.updateTodolist(idTDL, title)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(changeTodoTitleAC({ idTDL, title }))
        dispatch(setAppStatusAC({ status: "succeeded" }))
        dispatch(changeTodoStatusAC({ idTDL, todoStatus: "succeeded" }))
      } else {
        ServerErrorHandler(res.data, dispatch)
        dispatch(changeTodoStatusAC({ idTDL, todoStatus: "failed" }))
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        NetWorkErrorHandler(e, dispatch)
      } else {
        NetWorkErrorHandler(e as Error, dispatch)
      }
      dispatch(changeTodoStatusAC({ idTDL, todoStatus: "failed" }))
    }
  }, 1000)
}
