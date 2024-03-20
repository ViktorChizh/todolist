import {addTodolistACType, changeTodoStatusAC, removeTodolistACType, setTodolistACType} from '../TodoListsReducer';
import {api, ErrorType, priority, resultCode, status, TaskType} from '../../../../api/api';
import {AppThunkType} from '../../../../app_and_store/Store';
import {AppReducerActionType, setAppStatusAC, StatusType} from '../../../../app_and_store/AppReducer';
import {NetWorkErrorHandler, ServerErrorHandler} from '../../../../utils/ErrorsHandler';
import axios from 'axios';

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
export const updateTaskAC = (idTDL: string, taskId: string, model: UpdateTaskType) => ({
    type: 'task/UPDATE-TASK' as const,
    payload: {idTDL, taskId, model}
})
export const setTasksAC = (tasks: TaskType[], idTDL: string) => ({type: 'task/SET-TASKS' as const, payload: {tasks, idTDL}})
export const cleanTasksAC = () => ({type: 'task/CLEAN-TASKS' as const})
//thunks
export const fetchTasksTC = (idTDL: string): AppThunkType => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        let res = await api.getTasks(idTDL)
        dispatch(setTasksAC(res.data.items.map(t => ({...t, taskStatus: 'idle'})), idTDL))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            NetWorkErrorHandler(e, dispatch)
        } else {
            NetWorkErrorHandler(e as Error, dispatch)
        }
    }
}
export const removeTaskTC = (idTDL: string, taskId: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskStatusAC(idTDL, taskId, 'loading'))
    setTimeout(async () => {
        try {
            let res = await api.deleteTask(idTDL, taskId)
            if (res.data.resultCode === resultCode.SUCCEEDED) {
                dispatch(removeTaskAC(idTDL, taskId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                ServerErrorHandler<{}>(res.data, dispatch)
                dispatch(changeTaskStatusAC(idTDL, taskId, 'failed'))
            }
        } catch (e) {
            if (axios.isAxiosError<ErrorType>(e)) {
                NetWorkErrorHandler(e, dispatch)
            } else {
                NetWorkErrorHandler(e as Error, dispatch)
            }
            dispatch(changeTodoStatusAC(idTDL, 'failed'))
        }
    }, 1000)
}
export const addTaskTC = (idTDL: string, title: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    setTimeout(async () => {
        try {
            let res = await api.createTask(idTDL, title)
            if (res.data.resultCode === resultCode.SUCCEEDED) {
                dispatch(addTaskAC({...res.data.data.item, taskStatus: 'idle'}))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                ServerErrorHandler<{ item: TaskType }>(res.data, dispatch)
            }
        } catch (e) {
            if (axios.isAxiosError<ErrorType>(e)) {
                NetWorkErrorHandler(e, dispatch)
            } else {
                NetWorkErrorHandler(e as Error, dispatch)
            }
            dispatch(changeTodoStatusAC(idTDL, 'failed'))
        }
    }, 1000)
}
export const updateTaskTC = (idTDL: string, taskId: string, model: UpdateTaskType): AppThunkType =>
    (dispatch, getState) => {
        let task = getState().tasks[idTDL].find(t => t.id === taskId)
        if (!task) return
        let updateTask = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model
        }
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTaskStatusAC(idTDL, taskId, 'loading'))
        setTimeout(async () => {
            try {
                let res = await api.updateTask(idTDL, taskId, updateTask)
                if (res.data.resultCode === resultCode.SUCCEEDED) {
                    dispatch(updateTaskAC(idTDL, taskId, model))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(changeTaskStatusAC(idTDL, taskId, 'succeeded'))
                } else {
                    ServerErrorHandler<{}>(res.data, dispatch)
                    dispatch(changeTaskStatusAC(idTDL, taskId, 'failed'))
                }
            } catch (e) {
                if (axios.isAxiosError<ErrorType>(e)) {
                    NetWorkErrorHandler(e, dispatch)
                } else {
                    NetWorkErrorHandler(e as Error, dispatch)
                }
                dispatch(changeTodoStatusAC(idTDL, 'failed'))
            }
        }, 1000)
    }

