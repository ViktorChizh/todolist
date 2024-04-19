import { StatusType } from "app/AppReducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { setTasksTC } from "features/pageTodolists/todolist/tasks/task/TasksReducer"
import { createAppAsyncThunk, thunkTryCatch, serverErrorHandler } from "common/utils"
import { actions } from "common/actions"
import { api, TodolistServerType } from "common/api"
import { resultCode } from "common/enums"

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
  },
  selectors: {
    todolistsSelector: (state) => state,
  },
})

//thunks
export const setTodolistTC = createAppAsyncThunk<{ todolists: TodolistServerType[] }, undefined>(
  `${slice.name}/setTodolistTC`,
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      let res = await api.getTodolists()
      res.data.forEach((tl) => dispatch(setTasksTC(tl.id)))
      return { todolists: res.data }
    })
  },
)
export const removeTodolistTC = createAppAsyncThunk<{ idTDL: string }, string>(
  `${slice.name}/removeTodolistTC`,
  (idTDL: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      dispatch(changeTodoStatusAC({ idTDL, todoStatus: "loading" }))
      let res = await api.deleteTodolist(idTDL)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(changeTodoStatusAC({ idTDL, todoStatus: "succeeded" }))
        return { idTDL }
      } else {
        serverErrorHandler(res.data, dispatch)
        dispatch(changeTodoStatusAC({ idTDL, todoStatus: "failed" }))
        return rejectWithValue(res.data)
      }
    })
  },
)
export const addTodolistTC = createAppAsyncThunk<{ todolist: TodolistServerType }, string>(
  `${slice.name}/addTodolistTC`,
  (title: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      let res = await api.createTodolist(title)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        return { todolist: res.data.data.item }
      } else {
        serverErrorHandler<{ item: TodolistServerType }>(res.data, dispatch)
        return rejectWithValue(res.data)
      }
    })
  },
)
export const updateTodolistTitleTC = createAppAsyncThunk<paramT, paramT>(
  `${slice.name}/updateTodolistTitleTC`,
  (param: { idTDL: string; title: string }, thunkAPI) => {
    const { idTDL, title } = param
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      dispatch(changeTodoStatusAC({ idTDL, todoStatus: "loading" }))
      let res = await api.updateTodolist(idTDL, title)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(changeTodoStatusAC({ idTDL, todoStatus: "succeeded" }))
        return { idTDL, title }
      } else {
        serverErrorHandler(res.data, dispatch)
        dispatch(changeTodoStatusAC({ idTDL, todoStatus: "failed" }))
        return rejectWithValue(res.data)
      }
    })
  },
)
export const updateTodolistFilterTC = createAppAsyncThunk<paramF, paramF>(
  `${slice.name}/updateTodolistFilterTC`,
  (param: { idTDL: string; filter: FilterValuesType }, thunkAPI) => {
    const { idTDL, filter } = param
    return thunkTryCatch(thunkAPI, async () => {
      return { idTDL, filter }
    })
  },
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
type paramF = { idTDL: string; filter: FilterValuesType }
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = TodolistServerType & { filter: FilterValuesType; todoStatus: StatusType }
