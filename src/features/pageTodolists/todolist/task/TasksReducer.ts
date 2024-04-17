import { addTodolistTC, removeTodolistTC, setTodolistTC } from "../TodoListsReducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk, serverErrorHandler, thunkTryCatch } from "common/utils"
import { resultCode } from "common/enums"
import { actions } from "common/actions"
import { api, TaskServerType, UpdateServerTaskType } from "common/api"
import { StatusType } from "app/AppReducer"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    changeTaskStatusAC(state, action: PayloadAction<{ idTDL: string; taskId: string; taskStatus: StatusType }>) {
      const index = state[action.payload.idTDL].findIndex((tl) => tl.id === action.payload.taskId)
      state[action.payload.idTDL][index] = {
        ...state[action.payload.idTDL][index],
        taskStatus: action.payload.taskStatus,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.idTDL]
      })
      .addCase(setTodolistTC.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => (state[tl.id] = []))
      })

      .addCase(setTasksTC.fulfilled, (state, action) => {
        state[action.payload.idTDL] = action.payload.tasks
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        const index = state[action.payload.idTDL].findIndex((tl) => tl.id === action.payload.taskId)
        state[action.payload.idTDL].splice(index, 1)
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        state[action.payload.idTDL].unshift({ ...action.payload.newTask, taskStatus: "idle" })
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        const index = state[action.payload.idTDL].findIndex((tl) => tl.id === action.payload.taskId)
        state[action.payload.idTDL][index] = { ...state[action.payload.idTDL][index], ...action.payload.model }
      })
      .addCase(actions.clearDataAC, (state, action) => {
        return action.payload.tasks
      })
  },
  selectors: {
    tasksSelector: (state) => state,
  },
})

//thunks
export const setTasksTC = createAppAsyncThunk<{ tasks: TaskType[]; idTDL: string }, string>(
  `${slice.name}/setTasksTC`,
  (idTDL, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await api.getTasks(idTDL)
      const tasks = res.data.items.map((t) => ({ ...t, taskStatus: "idle" as StatusType }))
      return { tasks, idTDL }
    })
  },
)
export const removeTaskTC = createAppAsyncThunk<{ idTDL: string; taskId: string }, { idTDL: string; taskId: string }>(
  `${slice.name}/removeTaskTC`,
  (param: { idTDL: string; taskId: string }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    const { idTDL, taskId } = param
    dispatch(changeTaskStatusAC({ idTDL, taskId, taskStatus: "loading" }))
    return thunkTryCatch(thunkAPI, async () => {
      let res = await api.deleteTask(idTDL, taskId)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        return { idTDL, taskId }
      } else {
        serverErrorHandler<{}>(res.data, dispatch)
        dispatch(changeTaskStatusAC({ idTDL, taskId, taskStatus: "failed" }))
        return rejectWithValue(null)
      }
    })
  },
)
export const addTaskTC = createAppAsyncThunk<{ idTDL: string; newTask: TaskType }, { idTDL: string; title: string }>(
  `${slice.name}/addTaskTC`,
  (param: { idTDL: string; title: string }, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch, rejectWithValue } = thunkAPI
      const { idTDL, title } = param
      let res = await api.createTask(idTDL, title)
      const newTask = res.data.data.item
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        return { idTDL, newTask }
      } else {
        serverErrorHandler<{ item: TaskType }>(res.data, dispatch)
        return rejectWithValue(null)
      }
    })
  },
)
export const updateTaskTC = createAppAsyncThunk<typeParam, typeParam>(
  `${slice.name}/updateTaskTC`,
  (param: typeParam, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch, rejectWithValue, getState } = thunkAPI
      const { idTDL, taskId, model } = param
      let task = getState().tasks[idTDL].find((t) => t.id === taskId)
      if (!task) {
        dispatch(actions.setAppErrorAC({ error: "Task not found" }))
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
      let res = await api.updateTask(idTDL, taskId, newTask)
      if (res.data.resultCode === resultCode.SUCCEEDED) {
        return { idTDL, taskId, model }
      } else {
        serverErrorHandler<{}>(res.data, dispatch)
        dispatch(changeTaskStatusAC({ idTDL, taskId, taskStatus: "failed" }))
        return rejectWithValue(null)
      }
    })
  },
)

export const tasksReducer = slice.reducer
export const { changeTaskStatusAC } = slice.actions
export const { tasksSelector } = slice.selectors
export const tasksThunks = { setTasksTC, removeTaskTC, addTaskTC, updateTaskTC }

//types
export type TaskType = TaskServerType & { taskStatus: StatusType }
export type TasksStateType = { [key: string]: TaskType[] }
export type UpdateTaskModelType = Partial<UpdateServerTaskType>
type typeParam = { idTDL: string; taskId: string; model: UpdateTaskModelType }
