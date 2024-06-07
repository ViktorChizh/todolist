import { addTodolistACType, changeTodoStatusAC, removeTodolistACType, setTodolistACType } from "../TodoListsReducer"
import {
    api, ErrorType,
    priority,
    ResponseTasksType,
    ResponseType,
    resultCode,
    status,
    TaskType,
    UpdateServerTaskType
} from "../../../../api/api"
import { AppReducerActionType, setAppStatusAC, StatusType } from "../../../../app_and_store/AppReducer"
import axios, { AxiosResponse } from "axios"
import { call, put, takeEvery, select } from "redux-saga/effects"
import { NetWorkErrorHandlerSaga, ServerErrorHandlerSaga } from "../../../../utils/ErrorsHandler"

export const tasksReducer = (state = {} as TasksStateType, action: TasksReducerActionType): TasksStateType => {
    switch (action.type) {
        case 'todolist/SET-TODOLIST':
            return action.payload.todolists.reduce((acc, tl) => ({...acc, [tl.id]: []}), {...state})
        case 'todolist/ADD-TODOLIST':
            return {...state, [action.payload.todolist.id]: []}
        case 'todolist/REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        case 'task/SET-TASKS':
            return {...state, [action.payload.idTDL]: action.payload.tasks}
        case 'task/ADD-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [{...action.payload.task, taskStatus: 'idle'},
                    ...state[action.payload.task.todoListId]]
            }
        case 'task/REMOVE-TASK':
            return {
                ...state,
                [action.payload.idTDL]: state[action.payload.idTDL].filter(t => t.id !== action.payload.taskId)
            }
        case 'task/UPDATE-TASK':
            return {
                ...state, [action.payload.idTDL]: state[action.payload.idTDL]
                    .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
            }
        case 'task/CHANGE-TASKSTATUS':
            return {
                ...state, [action.payload.idTDL]: state[action.payload.idTDL]
                    .map(t => t.id === action.payload.taskId ? {...t, taskStatus: action.payload.taskStatus} : t)
            }
        case 'task/CLEAN-TASKS':
            return {}
        default:
            return state
    }
}
//types
export type TasksStateType = {
    [key: string]: TaskType[]
}
export type UpdateTaskType = {
    title?: string
    description?: string
    status?: status
    priority?: priority
    startDate?: Date
    deadline?: Date
}
export type TasksReducerActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof cleanTasksAC>
    | removeTodolistACType
    | addTodolistACType
    | setTodolistACType
    | AppReducerActionType
//actions
export const removeTaskAC = (idTDL: string, taskId: string) => ({
    type: 'task/REMOVE-TASK' as const,
    payload: {idTDL, taskId}
})
export const addTaskAC = (task: TaskType) => ({type: 'task/ADD-TASK' as const, payload: {task}})
export const changeTaskStatusAC = (idTDL: string, taskId: string, taskStatus: StatusType) => ({
    type: 'task/CHANGE-TASKSTATUS' as const,
    payload: {idTDL, taskId, taskStatus}
})
export const updateTaskAC = (idTDL: string, taskId: string, model: Partial<UpdateServerTaskType>) => ({
    type: 'task/UPDATE-TASK' as const,
    payload: {idTDL, taskId, model}
})
export const setTasksAC = (tasks: TaskType[], idTDL: string) => ({type: 'task/SET-TASKS' as const, payload: {tasks, idTDL}})
export const cleanTasksAC = () => ({type: 'task/CLEAN-TASKS' as const})
//sagas
export function* fetchTasksWorkerSaga (action: ReturnType<typeof fetchTasks>){
    try {
        yield put(setAppStatusAC('loading'))

        let res:ResponseTasksType = yield call(api.getTasks, action.idTDL)
        yield put(setTasksAC(res.items.map(t => ({...t, taskStatus: 'idle'})), action.idTDL))
        yield put(setAppStatusAC('succeeded'))
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
           yield* NetWorkErrorHandlerSaga(e)
        } else {
            yield* NetWorkErrorHandlerSaga(e as Error)
        }
    }
}
export const fetchTasks= (idTDL: string) => ({type:'tasks/FETCH-TASKS', idTDL})

export function* removeTaskWorkerSaga(action: ReturnType<typeof removeTask>) {
    yield put(setAppStatusAC('loading'))
    yield put(changeTaskStatusAC(action.idTDL, action.taskId, 'loading'))
        try {
            let res: AxiosResponse<ResponseType> =  yield call(api.deleteTask, action.idTDL, action.taskId)
            if (res.data.resultCode === resultCode.SUCCEEDED) {
                yield put(removeTaskAC(action.idTDL, action.taskId))
                yield put(setAppStatusAC('succeeded'))
            } else {
                put(changeTaskStatusAC(action.idTDL, action.taskId, 'failed'))
                return ServerErrorHandlerSaga(res.data,)
            }
        } catch (e) {
            yield put(changeTodoStatusAC(action.idTDL, 'failed'))

            if (axios.isAxiosError<ErrorType>(e)) {
                return NetWorkErrorHandlerSaga(e)
            } else {
               return NetWorkErrorHandlerSaga(e as Error)
            }
}
}
export const removeTask= (idTDL: string, taskId: string)=> ({type:'tasks/REMOVE-TASKS', idTDL, taskId})

export function* addTaskWorkerSaga(action: ReturnType<typeof addTask>) {
    yield put(setAppStatusAC('loading'))
    try {
        let res: AxiosResponse<ResponseType<{ item: TaskType }>>  = yield call(api.createTask, action.idTDL, action.title)
        if (res.data.resultCode === resultCode.SUCCEEDED) {
            yield put(addTaskAC({...res.data.data.item, taskStatus: 'idle'}))
            yield put(setAppStatusAC('succeeded'))
        } else {
            return ServerErrorHandlerSaga(res.data)
        }
    } catch (e) {
        yield put(changeTodoStatusAC(action.idTDL, 'failed'))

        if (axios.isAxiosError<ErrorType>(e)) {
           return NetWorkErrorHandlerSaga(e)
        } else {
           return NetWorkErrorHandlerSaga(e as Error)
        }

    }
}
export const addTask = (idTDL: string, title: string)=> ({type:'tasks/ADD-TASKS', idTDL, title})

export function* updateTaskWorkerSaga(action: ReturnType<typeof updateTask>){
      const tasks: TaskType[] = yield select(state=> state.tasks[action.idTDL])
      let task: TaskType | undefined = tasks.find(t => t.id === action.taskId)
      if (!task) return
      let newTask: UpdateServerTaskType = {
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          ...action.model
      }
    yield put(setAppStatusAC('loading'))
    yield put(changeTaskStatusAC(action.idTDL, action.taskId, 'loading'))
      try {
          let res: AxiosResponse<ResponseType> = yield call(api.updateTask, action.idTDL, action.taskId, newTask)
          if (res.data.resultCode === resultCode.SUCCEEDED) {
              yield put(updateTaskAC(action.idTDL, action.taskId, action.model))
              yield put(setAppStatusAC('succeeded'))
              yield put(changeTaskStatusAC(action.idTDL, action.taskId, 'succeeded'))
          }
          else {
              ServerErrorHandlerSaga(res.data)
              put(changeTaskStatusAC(action.idTDL, action.taskId, 'failed'))
          }
      } catch (e) {
          put(changeTodoStatusAC(action.idTDL, 'failed'))

          if (axios.isAxiosError<ErrorType>(e)) {
              NetWorkErrorHandlerSaga(e)
          } else {
              NetWorkErrorHandlerSaga(e as Error)
          }

      }
  }
export const updateTask = (idTDL: string, taskId: string, model: UpdateTaskType) => ({type:'tasks/UPDATE-TASKS', idTDL, taskId, model})

export function* tasksWatcher(){
    yield takeEvery("tasks/FETCH-TASKS", fetchTasksWorkerSaga)
    yield takeEvery("tasks/REMOVE-TASKS", removeTaskWorkerSaga)
    yield takeEvery("tasks/ADD-TASKS", addTaskWorkerSaga)
    yield takeEvery("tasks/UPDATE-TASKS", updateTaskWorkerSaga)
}