import { Status } from "app/AppReducer"
import { createAsyncThunk, createSlice, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { setTasksTC } from "features/pageTodolists/todolist/tasks/TasksReducer"
import { createAppAsyncThunk } from "common/utils"
import { actions } from "common/actions"
import { api, TodolistServer } from "common/api"
import { resultCode } from "common/enums"
import { ThunkDispatch } from "redux-thunk"
import { AppDispatch, AppState } from "app/Store"
import { AnyAction } from "redux"

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistApp[],
  reducers: {
    changeTodoStatusAC(state, action: PayloadAction<{ idTDL: string; todoStatus: Status }>) {
      const index = state.findIndex((t) => t.id === action.payload.idTDL)
      state[index] = {
        ...state[index],
        todoStatus: action.payload.todoStatus,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTodolistTC.fulfilled, (_, action) => {
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
      .addCase(actions.clearDataAC, (_, action) => {
        return action.payload.todolists
      })
      .addMatcher(isRejected(removeTodolistTC), (state, action) => {
        const todo = state.find((todo) => todo.id === action.meta.arg)
        if (todo) todo.todoStatus = "idle"
      })
  },
  selectors: {
    todolistsSelector: (state) => state,
  },
})

//thunks
export const setTodolistTC = createAsyncThunk< { todolists: TodolistServer[] }, undefined,
    {dispatch: ThunkDispatch<AppState, unknown, AnyAction>}>(`${slice.name}/setTodolistTC`, async (_, { dispatch }) => {
    const res = await api.getTodolists()
    res.data.forEach((tl) => (dispatch as AppDispatch)(setTasksTC(tl.id)))
    return { todolists: res.data }
  },
)
export const removeTodolistTC = createAppAsyncThunk<{ idTDL: string }, string>(
  `${slice.name}/removeTodolistTC`,
  async (idTDL: string, { dispatch, rejectWithValue }) => {
    dispatch(changeTodoStatusAC({ idTDL, todoStatus: "loading" }))
    const res = await api.deleteTodolist(idTDL)
    if (res.data.resultCode === resultCode.SUCCEEDED) {
      dispatch(changeTodoStatusAC({ idTDL, todoStatus: "succeeded" }))
      return { idTDL }
    } else {
      dispatch(changeTodoStatusAC({ idTDL, todoStatus: "failed" }))
      return rejectWithValue(res.data)
    }
  },
)
export const addTodolistTC = createAppAsyncThunk<{ todolist: TodolistServer }, string>(
  `${slice.name}/addTodolistTC`,
  async (title: string, { dispatch, rejectWithValue }) => {
    const res = await api.createTodolist(title)
    if (res.data.resultCode === resultCode.SUCCEEDED) {
      return { todolist: res.data.data.item }
    } else {
      return rejectWithValue(res.data)
    }
  },
)
export const updateTodolistTitleTC = createAppAsyncThunk<paramT, paramT>(
  `${slice.name}/updateTodolistTitleTC`,
  async (param: { idTDL: string; title: string }, { dispatch, rejectWithValue }) => {
    const { idTDL, title } = param
    dispatch(changeTodoStatusAC({ idTDL, todoStatus: "loading" }))
    const res = await api.updateTodolist(idTDL, title)
    if (res.data.resultCode === resultCode.SUCCEEDED) {
      dispatch(changeTodoStatusAC({ idTDL, todoStatus: "succeeded" }))
      return { idTDL, title }
    } else {
      dispatch(changeTodoStatusAC({ idTDL, todoStatus: "failed" }))
      return rejectWithValue(res.data)
    }
  },
)
export const updateTodolistFilterTC = createAppAsyncThunk<paramF, paramF>(
  `${slice.name}/updateTodolistFilterTC`,
  async (param: { idTDL: string; filter: FilterValues }) => param,
)

export const todoListsReducer = slice.reducer
export const { changeTodoStatusAC } = slice.actions
export const { todolistsSelector } = slice.selectors
export const todolistsThunks = {
  setTodolistTC,
  removeTodolistTC,
  addTodolistTC,
  updateTodolistTitleTC,
  updateTodolistFilterTC,
}
//types
type paramT = { idTDL: string; title: string }
type paramF = { idTDL: string; filter: FilterValues }
export type FilterValues = "all" | "active" | "completed"
export type TodolistApp = TodolistServer & { filter: FilterValues; todoStatus: Status }
