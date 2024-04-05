import { api, ErrorType, resultCode, TodolistServerType } from "common/api/api"
import { setAppStatus, StatusType } from "app_and_store/AppReducer"
import { serverErrorHandler } from "common/utils/serverErrorHandler"
import axios from "axios"
import { setTasks } from "./task/TasksReducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"
import { netWorkErrorHandler } from "common/utils/netWorkErrorHandler"

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
export const setTodolistTC = () => async (dispatch: any) => {
  try {
    dispatch(setAppStatus({ status: "loading" }))
    let res = await api.getTodolists()
    dispatch(setTodolist({ todolists: res.data }))
    res.data.forEach((tl) => dispatch(setTasks(tl.id)))
    dispatch(setAppStatus({ status: "succeeded" }))
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      netWorkErrorHandler(e, dispatch)
    } else {
      netWorkErrorHandler(e as Error, dispatch)
    }
  }
}
export const removeTodolistTC = (idTDL: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(updateTodolist({ idTDL, model: { todoStatus: "loading" } }))
    let res = await api.deleteTodolist(idTDL)
    if (res.data.resultCode === resultCode.SUCCEEDED) {
      dispatch(removeTodolist({ idTDL }))
      dispatch(setAppStatus({ status: "succeeded" }))
    } else {
      serverErrorHandler(res.data, dispatch)
      dispatch(updateTodolist({ idTDL, model: { todoStatus: "failed" } }))
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      netWorkErrorHandler(e, dispatch)
    } else {
      netWorkErrorHandler(e as Error, dispatch)
    }
    dispatch(updateTodolist({ idTDL, model: { todoStatus: "failed" } }))
  }
}
export const addTodolistTC = (title: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setAppStatus({ status: "loading" }))
    let res = await api.createTodolist(title)
    if (res.data.resultCode === resultCode.SUCCEEDED) {
      dispatch(addTodolist({ todolist: res.data.data.item }))
      dispatch(setAppStatus({ status: "succeeded" }))
    } else {
      serverErrorHandler<{ item: TodolistServerType }>(res.data, dispatch)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      netWorkErrorHandler(e, dispatch)
    } else {
      netWorkErrorHandler(e as Error, dispatch)
    }
  }
}
export const updateTodolistTC = (idTDL: string, title: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(updateTodolist({ idTDL, model: { todoStatus: "loading" } }))
    let res = await api.updateTodolist(idTDL, title)
    if (res.data.resultCode === resultCode.SUCCEEDED) {
      dispatch(updateTodolist({ idTDL, model: { title } }))
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(updateTodolist({ idTDL, model: { todoStatus: "succeeded" } }))
    } else {
      serverErrorHandler(res.data, dispatch)
      dispatch(updateTodolist({ idTDL, model: { todoStatus: "failed" } }))
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      netWorkErrorHandler(e, dispatch)
    } else {
      netWorkErrorHandler(e as Error, dispatch)
    }
    dispatch(updateTodolist({ idTDL, model: { todoStatus: "failed" } }))
  }
}
