import { api, ErrorType, resultCode, TodolistServerType } from "api/api"
import { setAppStatus, StatusType } from "app_and_store/AppReducer"
import { NetWorkErrorHandler, ServerErrorHandler } from "utils/ErrorsHandler"
import axios from "axios"
import { fetchTasksTC } from "./task/TasksReducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistType[],
  reducers: {
    removeTodolist(state, action: PayloadAction<{ idTDL: string }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.idTDL)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addTodolist(state, action: PayloadAction<{ todolist: TodolistServerType }>) {
      state.unshift({ ...action.payload.todolist, filter: "all", todoStatus: "idle" })
    },
    setTodolist(_, action: PayloadAction<{ todolists: TodolistServerType[] }>) {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", todoStatus: "idle" }))
    },
    updateTodolist(state, action: PayloadAction<{ idTDL: string; model: UpdateTodoModelType }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.idTDL)
      state[index] = { ...state[index], ...action.payload.model }
    },
    cleanTodolist() {
      return [] as TodolistType[]
    },
  },
  selectors: {
    todolistsSelector: (state) => state,
  },
})

export const todoListsReducer = slice.reducer
export const { removeTodolist, addTodolist, setTodolist, updateTodolist, cleanTodolist } = slice.actions
export const { todolistsSelector } = slice.selectors

//types
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = TodolistServerType & { filter: FilterValuesType; todoStatus: StatusType }
export type UpdateTodoModelType = {
  title?: string
  filter?: FilterValuesType
  todoStatus?: StatusType
}

//thunks
export const setTodolistTC = () => (dispatch: any) => {
  dispatch(setAppStatus({ status: "loading" }))
  setTimeout(async () => {
    try {
      let res = await api.getTodolists()
      dispatch(setTodolist({ todolists: res.data }))
      res.data.forEach((tl) => dispatch(fetchTasksTC(tl.id)))
      dispatch(setAppStatus({ status: "succeeded" }))
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
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(updateTodolist({ idTDL, model: { todoStatus: "loading" } }))
  setTimeout(async () => {
    try {
      let res = await api.deleteTodolist(idTDL)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(removeTodolist({ idTDL }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        ServerErrorHandler(res.data, dispatch)
        dispatch(updateTodolist({ idTDL, model: { todoStatus: "failed" } }))
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        NetWorkErrorHandler(e, dispatch)
      } else {
        NetWorkErrorHandler(e as Error, dispatch)
      }
      dispatch(updateTodolist({ idTDL, model: { todoStatus: "failed" } }))
    }
  }, 1000)
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  setTimeout(async () => {
    try {
      let res = await api.createTodolist(title)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(addTodolist({ todolist: res.data.data.item }))
        dispatch(setAppStatus({ status: "succeeded" }))
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
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(updateTodolist({ idTDL, model: { todoStatus: "loading" } }))
  setTimeout(async () => {
    try {
      let res = await api.updateTodolist(idTDL, title)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(updateTodolist({ idTDL, model: { title } }))
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(updateTodolist({ idTDL, model: { todoStatus: "succeeded" } }))
      } else {
        ServerErrorHandler(res.data, dispatch)
        dispatch(updateTodolist({ idTDL, model: { todoStatus: "failed" } }))
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        NetWorkErrorHandler(e, dispatch)
      } else {
        NetWorkErrorHandler(e as Error, dispatch)
      }
      dispatch(updateTodolist({ idTDL, model: { todoStatus: "failed" } }))
    }
  }, 1000)
}
