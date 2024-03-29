import {
  addTodolistAC,
  changeTodoStatusAC,
  removeTodolistAC,
  setTodolistAC,
} from "../TodoListsReducer"
import { api, ErrorType, resultCode, TaskPriorities, TaskStatuses, TaskType } from "api/api"
import { AppStateType } from "app_and_store/Store"
import { setAppStatusAC, StatusType } from "app_and_store/AppReducer"
import { NetWorkErrorHandler, ServerErrorHandler } from "utils/ErrorsHandler"
import axios from "axios"
import { Dispatch } from "redux"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  extraReducers: (bilder) => {
    bilder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    bilder.addCase(setTodolistAC, (state, action) => {
      return action.payload.todolists.reduce((acc, tl) => ({ ...acc, [tl.id]: [] }), { ...state })
    })
    bilder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.idTDL]
    })
  },
  reducers: {
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift({ ...action.payload.task, taskStatus: "idle" })
    },
    removeTaskAC(state, action: PayloadAction<{ idTDL: string; taskId: string }>) {
      const index = state[action.payload.idTDL].findIndex((tl) => tl.id === action.payload.taskId)
      state[action.payload.idTDL].splice(index, 1)
    },
    updateTaskAC(
      state,
      action: PayloadAction<{ idTDL: string; taskId: string; model: UpdateTaskType }>,
    ) {
      const index = state[action.payload.idTDL].findIndex((tl) => tl.id === action.payload.taskId)
      state[action.payload.idTDL][index] = {
        ...state[action.payload.idTDL][index],
        ...action.payload.model,
      }
    },
    setTasksAC(state, action: PayloadAction<{ tasks: TaskType[]; idTDL: string }>) {
      state[action.payload.idTDL] = action.payload.tasks
    },
    cleanTasksAC() {
      return {}
    },
  },
})

export const tasksReducer = slice.reducer
export const { addTaskAC, removeTaskAC, updateTaskAC, setTasksAC, cleanTasksAC } = slice.actions
//types
export type TasksStateType = {
  [key: string]: TaskType[]
}
export type UpdateTaskType = {
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
    dispatch(setAppStatusAC({ status: "loading" }))
    let res = await api.getTasks(idTDL)
    dispatch(
      setTasksAC({ tasks: res.data.items.map((t) => ({ ...t, taskStatus: "idle" })), idTDL }),
    )
    dispatch(setAppStatusAC({ status: "succeeded" }))
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      NetWorkErrorHandler(e, dispatch)
    } else {
      NetWorkErrorHandler(e as Error, dispatch)
    }
  }
}
export const removeTaskTC = (idTDL: string, taskId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  dispatch(updateTaskAC({ idTDL, taskId, model: { taskStatus: "loading" } }))
  setTimeout(async () => {
    try {
      let res = await api.deleteTask(idTDL, taskId)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(removeTaskAC({ idTDL, taskId }))
        dispatch(setAppStatusAC({ status: "succeeded" }))
      } else {
        ServerErrorHandler<{}>(res.data, dispatch)
        dispatch(updateTaskAC({ idTDL, taskId, model: { taskStatus: "failed" } }))
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
export const addTaskTC = (idTDL: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  setTimeout(async () => {
    try {
      let res = await api.createTask(idTDL, title)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        dispatch(addTaskAC({ task: { ...res.data.data.item } }))
        dispatch(setAppStatusAC({ status: "succeeded" }))
      } else {
        ServerErrorHandler<{ item: TaskType }>(res.data, dispatch)
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
export const updateTaskTC =
  (idTDL: string, taskId: string, model: UpdateTaskType) =>
  (dispatch: Dispatch, getState: () => AppStateType) => {
    let task = getState().tasks[idTDL].find((t) => t.id === taskId)
    if (!task) return
    let updateTask = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...model,
    }
    dispatch(setAppStatusAC({ status: "loading" }))
    dispatch(updateTaskAC({ idTDL, taskId, model: { taskStatus: "loading" } }))
    setTimeout(async () => {
      try {
        let res = await api.updateTask(idTDL, taskId, updateTask)
        if (res.data.resultCode === resultCode.SUCCEEDED) {
          dispatch(updateTaskAC({ idTDL, taskId, model }))
          dispatch(setAppStatusAC({ status: "succeeded" }))
          dispatch(updateTaskAC({ idTDL, taskId, model: { taskStatus: "succeeded" } }))
        } else {
          ServerErrorHandler<{}>(res.data, dispatch)
          dispatch(updateTaskAC({ idTDL, taskId, model: { taskStatus: "failed" } }))
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
