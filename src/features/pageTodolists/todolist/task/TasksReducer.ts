import { addTodolist, updateTodolist, removeTodolist, setTodolist } from "../TodoListsReducer"
import { api, ErrorType, resultCode, TaskPriorities, TaskStatuses, TaskType } from "api/api"
import { AppStateType } from "app_and_store/Store"
import { setAppStatus, StatusType } from "app_and_store/AppReducer"
import { NetWorkErrorHandler, ServerErrorHandler } from "utils/ErrorsHandler"
import axios from "axios"
import { Dispatch } from "redux"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
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
  },
  reducers: {
    addTask(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift({ ...action.payload.task, taskStatus: "idle" })
    },
    removeTask(state, action: PayloadAction<{ idTDL: string; taskId: string }>) {
      const index = state[action.payload.idTDL].findIndex((tl) => tl.id === action.payload.taskId)
      state[action.payload.idTDL].splice(index, 1)
    },
    updateTask(state, action: PayloadAction<{ idTDL: string; taskId: string; model: UpdateTaskModelType }>) {
      const index = state[action.payload.idTDL].findIndex((tl) => tl.id === action.payload.taskId)
      state[action.payload.idTDL][index] = { ...state[action.payload.idTDL][index], ...action.payload.model }
    },
    setTasks(state, action: PayloadAction<{ tasks: TaskType[]; idTDL: string }>) {
      state[action.payload.idTDL] = action.payload.tasks
    },
    cleanTasks() {
      return {}
    },
  },
  // selectors: {
  //   tasksSelector: (state) => state[idTDL]
  // }
})

export const tasksReducer = slice.reducer
export const { addTask, removeTask, updateTask, setTasks, cleanTasks } = slice.actions
// export const {tasksSelector} = slice.selectors
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
  taskStatus?: StatusType
}

//thunks
export const fetchTasksTC = (idTDL: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setAppStatus({ status: "loading" }))
    let res = await api.getTasks(idTDL)
    dispatch(setTasks({ tasks: res.data.items.map((t) => ({ ...t, taskStatus: "idle" })), idTDL }))
    dispatch(setAppStatus({ status: "succeeded" }))
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      NetWorkErrorHandler(e, dispatch)
    } else {
      NetWorkErrorHandler(e as Error, dispatch)
    }
  }
}
export const removeTaskTC = (idTDL: string, taskId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(updateTask({ idTDL, taskId, model: { taskStatus: "loading" } }))
  setTimeout(async () => {
    try {
      let res = await api.deleteTask(idTDL, taskId)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(removeTask({ idTDL, taskId }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        ServerErrorHandler<{}>(res.data, dispatch)
        dispatch(updateTask({ idTDL, taskId, model: { taskStatus: "failed" } }))
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
export const addTaskTC = (idTDL: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  setTimeout(async () => {
    try {
      let res = await api.createTask(idTDL, title)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(addTask({ task: { ...res.data.data.item } }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        ServerErrorHandler<{ item: TaskType }>(res.data, dispatch)
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
export const updateTaskTC =
  (idTDL: string, taskId: string, model: UpdateTaskModelType) => (dispatch: Dispatch, getState: () => AppStateType) => {
    let task = getState().tasks[idTDL].find((t) => t.id === taskId)
    if (!task) return
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
    dispatch(updateTask({ idTDL, taskId, model: { taskStatus: "loading" } }))
    setTimeout(async () => {
      try {
        let res = await api.updateTask(idTDL, taskId, newTask)
        if (res.data.resultCode === resultCode.SUCCEEDED) {
          dispatch(updateTask({ idTDL, taskId, model }))
          dispatch(setAppStatus({ status: "succeeded" }))
          dispatch(updateTask({ idTDL, taskId, model: { taskStatus: "succeeded" } }))
        } else {
          ServerErrorHandler<{}>(res.data, dispatch)
          dispatch(updateTask({ idTDL, taskId, model: { taskStatus: "failed" } }))
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
