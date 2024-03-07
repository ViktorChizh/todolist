import {addTodolistACType, removeTodolistACType, setTodolistACType} from './todoListsReducer';
import {api, TaskType, status, priority} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AppStoreType} from './Store';

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksReducerActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLIST': {
            return action.payload.todolists.reduce((acc, tl) => ({...acc, [tl.id]: []}), {})
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.tdl.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }

        case 'SET-TASKS': {
            return ({...state, [action.payload.idTDL]: [...action.payload.tasks]});
        }
        case 'ADD-TASK': {
            return ({
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            });
        }
        case 'REMOVE-TASK': {
            return ({
                ...state,
                [action.payload.idTDL]: state[action.payload.idTDL].filter(t => t.id !== action.payload.taskId)
            });
        }
        case 'UPDATE-TASK': {
            return ({
                ...state, [action.payload.idTDL]: state[action.payload.idTDL]
                    .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
            });
        }
        default:
            return state
    }
}

export type TasksReducerActionType = removeTaskACType | addTaskACType | updateTaskACType
    | addTodolistACType | removeTodolistACType | setTodolistACType | setTasksACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>
type setTasksACType = ReturnType<typeof setTasksAC>

export type UpdateTaskType = {
    title?: string
    description?: string
    status?: status
    priority?: priority
    startDate?: Date
    deadline?: Date
}

export const removeTaskAC = (idTDL: string, taskId: string) => ({
    type: 'REMOVE-TASK' as const,
    payload: {idTDL, taskId}
})
export const addTaskAC = (task: TaskType) => ({
    type: 'ADD-TASK' as const,
    payload: {task}
})
export const updateTaskAC = (idTDL: string, taskId: string, model: UpdateTaskType) => ({
    type: 'UPDATE-TASK' as const,
    payload: {idTDL, taskId, model}
})
export const setTasksAC = (tasks: TaskType[], idTDL: string) => ({
    type: 'SET-TASKS' as const,
    payload: {tasks, idTDL}
})

export const fetchTasksTC = (idTDL: string) => {
    return (dispatch: Dispatch) => {
        api.getTasks(idTDL)
            .then(res => dispatch(setTasksAC(res.data.items, idTDL)))
    }
}
export const removeTaskTC = (idTDL: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        api.deleteTask(idTDL, taskId)
            .then(res => dispatch(removeTaskAC(idTDL, taskId)))
    }
}
export const addTaskTC = (idTDL: string, title: string) => {
    return (dispatch: Dispatch) => {
        api.createTask(idTDL, title)
            .then(res => dispatch(addTaskAC(res.data.data.item)))
    }
}
export const updateTaskTC = (idTDL: string, taskId: string, model: UpdateTaskType) => {
    return (dispatch: Dispatch, getState: () => AppStoreType) => {
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
        api.updateTask(idTDL, taskId, updateTask)
            .then(res => dispatch(updateTaskAC(idTDL, taskId, model)))
    }
}
