import { api, TodolistServerType } from "common/api/api"
import { setAppStatusAC, StatusType } from "app/AppReducer"
import { serverErrorHandler } from "common/utils/serverErrorHandler"
import { setTasksTC } from "./task/TasksReducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk, netWorkErrorHandler } from "common/utils"
import { resultCode } from "common/enums"
import { clearDataAfterLogoutAC } from "common/actions/common-actions"

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistType[],
  reducers: {
    changeTodoStatusAC(state, action: PayloadAction<{ idTDL: string; todoStatus: StatusType }>) {
      const index = state.findIndex((t) => t.id === action.payload.idTDL)
      state[index] = {
        ...state[index],
        todoStatus: action.payload.todoStatus,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTodolistTC.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", todoStatus: "idle" }))
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.idTDL)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all", todoStatus: "idle" })
      })
      .addCase(updateTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.idTDL)
        state[index] = { ...state[index], title: action.payload.title }
      })
      .addCase(updateTodolistFilterTC.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.idTDL)
        state[index] = { ...state[index], filter: action.payload.filter }
      })
      .addCase(clearDataAfterLogoutAC, (state, action) => {
        return action.payload.todolists
      })
  },
  selectors: {
    todolistsSelector: (state) => state,
  },
})

//thunks
export const setTodolistTC = createAppAsyncThunk<{ todolists: TodolistServerType[] }, undefined>(
  `${slice.name}/setTodolistTC`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatusAC({ status: "loading" }))
      let res = await api.getTodolists()
      res.data.forEach((tl) => dispatch(setTasksTC(tl.id)))
      dispatch(setAppStatusAC({ status: "succeeded" }))
      return { todolists: res.data }
    } catch (e) {
      netWorkErrorHandler(e, dispatch)
      return rejectWithValue(null)
    }
  },
)
export const removeTodolistTC = createAppAsyncThunk<{ idTDL: string }, string>(
  `${slice.name}/removeTodolistTC`,
  async (idTDL: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatusAC({ status: "loading" }))
      dispatch(changeTodoStatusAC({ idTDL, todoStatus: "loading" }))
      let res = await api.deleteTodolist(idTDL)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(setAppStatusAC({ status: "succeeded" }))
        dispatch(changeTodoStatusAC({ idTDL, todoStatus: "succeeded" }))
        return { idTDL }
      } else {
        serverErrorHandler(res.data, dispatch)
        dispatch(changeTodoStatusAC({ idTDL, todoStatus: "failed" }))
        return rejectWithValue(null)
      }
    } catch (e) {
      netWorkErrorHandler(e, dispatch)
      dispatch(changeTodoStatusAC({ idTDL, todoStatus: "failed" }))
      return rejectWithValue(null)
    }
  },
)
export const addTodolistTC = createAppAsyncThunk<{ todolist: TodolistServerType }, string>(
  `${slice.name}/addTodolistTC`,
  async (title: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatusAC({ status: "loading" }))
      let res = await api.createTodolist(title)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(setAppStatusAC({ status: "succeeded" }))
        return { todolist: res.data.data.item }
      } else {
        serverErrorHandler<{ item: TodolistServerType }>(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      netWorkErrorHandler(e, dispatch)
      return rejectWithValue(null)
    }
  },
)
export const updateTodolistTitleTC = createAppAsyncThunk<paramT, paramT>(
  `${slice.name}/updateTodolistTitleTC`,
  async (param: { idTDL: string; title: string }, { dispatch, rejectWithValue }) => {
    const { idTDL, title } = param
    try {
      dispatch(setAppStatusAC({ status: "loading" }))
      dispatch(changeTodoStatusAC({ idTDL, todoStatus: "loading" }))
      let res = await api.updateTodolist(idTDL, title)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(setAppStatusAC({ status: "succeeded" }))
        dispatch(changeTodoStatusAC({ idTDL, todoStatus: "succeeded" }))
        return { idTDL, title }
      } else {
        serverErrorHandler(res.data, dispatch)
        dispatch(changeTodoStatusAC({ idTDL, todoStatus: "failed" }))
        return rejectWithValue(null)
      }
    } catch (e) {
      netWorkErrorHandler(e, dispatch)
      dispatch(changeTodoStatusAC({ idTDL, todoStatus: "failed" }))
      return rejectWithValue(null)
    }
  },
)
export const updateTodolistFilterTC = createAppAsyncThunk<paramF, paramF>(
  `${slice.name}/updateTodolistFilterTC`,
  async (param: { idTDL: string; filter: FilterValuesType }, { dispatch, rejectWithValue }) => {
    const { idTDL, filter } = param
    try {
      return { idTDL, filter }
    } catch (e) {
      netWorkErrorHandler(e, dispatch)
      return rejectWithValue(null)
    }
  },
)
//types
type paramT = { idTDL: string; title: string }
type paramF = { idTDL: string; filter: FilterValuesType }
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = TodolistServerType & { filter: FilterValuesType; todoStatus: StatusType }
// exports
export const todoListsReducer = slice.reducer
export const { changeTodoStatusAC } = slice.actions
export const { todolistsSelector } = slice.selectors
export const todolistsThunk = {
  setTodolistTC,
  removeTodolistTC,
  addTodolistTC,
  updateTodolistTitleTC,
  updateTodolistFilterTC,
}
