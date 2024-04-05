import { addTodolist, removeTodolist, setTodolist, updateTodolist } from "../TodoListsReducer"
import { api, ErrorType, resultCode, TaskPriorities, TaskStatuses, TaskType } from "common/api/api"
import { AppStateType } from "app_and_store/Store"
import { setAppError, setAppStatus, StatusType } from "app_and_store/AppReducer"
import { serverErrorHandler } from "common/utils/serverErrorHandler"
import axios from "axios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { netWorkErrorHandler } from "common/utils/netWorkErrorHandler"

//thunks
export const setTasks = createAppAsyncThunk<{ tasks: TaskType[]; idTDL: string }, string>(
  "tasks/setTasks",
  async (idTDL, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      const res = await api.getTasks(idTDL)
      const tasks = res.data.items.map((t) => ({ ...t, taskStatus: "idle" as StatusType }))
      dispatch(setAppStatus({ status: "succeeded" }))
      return { tasks, idTDL }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        netWorkErrorHandler(e, dispatch)
      } else {
        netWorkErrorHandler(e as Error, dispatch)
      }
      return rejectWithValue(null)
    }
  },
)
export const removeTask = createAppAsyncThunk(
  "tasks/removeTask",
  async (param: { idTDL: string; taskId: string }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    const { idTDL, taskId } = param
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(changeTaskStatus({ idTDL, taskId, taskStatus: "loading" }))
    try {
      let res = await api.deleteTask(idTDL, taskId)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { idTDL, taskId }
      } else {
        serverErrorHandler<{}>(res.data, dispatch)
        dispatch(changeTaskStatus({ idTDL, taskId, taskStatus: "failed" }))
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        netWorkErrorHandler(e, dispatch)
      } else {
        netWorkErrorHandler(e as Error, dispatch)
      }
      dispatch(updateTodolist({ idTDL, model: { todoStatus: "failed" } }))
      return rejectWithValue(null)
    }
  },
)
export const addTask = createAppAsyncThunk(
  "tasks/addTask",
  async (
    param: {
      idTDL: string
      title: string
    },
    thunkAPI,
  ) => {
    const { dispatch } = thunkAPI
    const { idTDL, title } = param
    dispatch(setAppStatus({ status: "loading" }))
    try {
      let res = await api.createTask(idTDL, title)
      const newTask = res.data.data.item
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { idTDL, newTask }
      } else {
        serverErrorHandler<{ item: TaskType }>(res.data, dispatch)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        netWorkErrorHandler(e, dispatch)
      } else {
        netWorkErrorHandler(e as Error, dispatch)
      }
      dispatch(updateTodolist({ idTDL, model: { todoStatus: "failed" } }))
    }
  },
)
export const updateTask = createAppAsyncThunk(
  "tasks/updateTask",
  async (param: { idTDL: string; taskId: string; model: UpdateTaskModelType }, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    const { idTDL, taskId, model } = param
    let task = (getState() as AppStateType).tasks[idTDL].find((t) => t.id === taskId)
    if (!task) {
      dispatch(setAppError({ error: "Task not found" }))
      return rejectWithValue(null)
    }
    let newTask = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...model,
    }
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(changeTaskStatus({ idTDL, taskId, taskStatus: "loading" }))
    try {
      let res = await api.updateTask(idTDL, taskId, newTask)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(changeTaskStatus({ idTDL, taskId, taskStatus: "succeeded" }))
        return { idTDL, taskId, model }
      } else {
        serverErrorHandler<{}>(res.data, dispatch)
        dispatch(changeTaskStatus({ idTDL, taskId, taskStatus: "failed" }))
        return rejectWithValue(null)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        netWorkErrorHandler(e, dispatch)
      } else {
        netWorkErrorHandler(e as Error, dispatch)
      }
      dispatch(updateTodolist({ idTDL, model: { todoStatus: "failed" } }))
      return rejectWithValue(null)
    }
  },
)

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    changeTaskStatus(state, action: PayloadAction<{ idTDL: string; taskId: string; taskStatus: StatusType }>) {
      const index = state[action.payload.idTDL].findIndex((tl) => tl.id === action.payload.taskId)
      state[action.payload.idTDL][index] = {
        ...state[action.payload.idTDL][index],
        taskStatus: action.payload.taskStatus,
      }
    },
    cleanTasks() {
      return {}
    },
  },
  extraReducers: (bilder) => {
    bilder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.idTDL]
      })
      .addCase(setTodolist, (state, action) => {
        action.payload.todolists.forEach((tl) => (state[tl.id] = []))
      })
      .addCase(setTasks.fulfilled, (state, action) => {
        state[action.payload.idTDL] = action.payload.tasks
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state[action.payload.idTDL].findIndex((tl) => tl.id === action.payload?.taskId)
          state[action.payload.idTDL].splice(index, 1)
        }
      })
      .addCase(addTask.fulfilled, (state, action) => {
        if (action.payload) {
          state[action.payload.idTDL].unshift({ ...action.payload.newTask, taskStatus: "idle" })
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state[action.payload.idTDL].findIndex((tl) => tl.id === action.payload?.taskId)
          state[action.payload.idTDL][index] = { ...state[action.payload.idTDL][index], ...action.payload.model }
        }
      })
  },
  selectors: {
    tasksSelector: (state) => state,
  },
})

export const tasksReducer = slice.reducer
export const { changeTaskStatus, cleanTasks } = slice.actions
export const { tasksSelector } = slice.selectors
export const tasksThunks = { setTasks, removeTask, addTask, updateTask }
//types
export type TasksStateType = {
  [key: string]: TaskType[]
}
export type UpdateTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: Date
  deadline?: Date
}
