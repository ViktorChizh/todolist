import {TasksStateType} from '../App';
import {v1} from 'uuid';

export const TasksReducer = (state: TasksStateType, action: TasksReducerActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD-NEW-TASKSLIST': {
            return {...state, [action.payload.id]: []}
        }
        case 'REMOVE-TASKSLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }
        case 'REMOVE-TASK': {
            return ({
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.id)
            });
        }
        case 'ADD-TASK': {
            let task = {id: v1(), title: action.payload.title, isDone: false};
            return ({...state, [action.payload.todolistId]: [task, ...state[action.payload.todolistId]]});
        }
        case 'CHANGE-STATUS': {
            return ({
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.id ? {...t, isDone: action.payload.isDone} : t)
            });
        }
        case 'UPDATE-TASK': {
            return ({
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
            });
        }
        default:
            return state
    }
}

type TasksReducerActionType =
    addNewTaskslistACType
    | removeTaskACType
    | addTaskACType
    | changeStatusACType
    | updateTaskACType
    | removeTaskslistACType

// или не создавая лишних типов:
// type TasksReducerActionType = ReturnType<typeof addNewTaskslistAC>
//     | ReturnType<typeof removeTaskAC>
//     | ReturnType<typeof addTaskAC>
//     | ReturnType<typeof changeStatusAC>
//     | ReturnType<typeof updateTaskAC>
//     | ReturnType<typeof removeTaskslistAC>

type addNewTaskslistACType = ReturnType<typeof addNewTaskslistAC>
export const addNewTaskslistAC = (id: string) => ({
    type: 'ADD-NEW-TASKSLIST' as const,
    payload: {id}
})

type removeTaskslistACType = ReturnType<typeof removeTaskslistAC>
export const removeTaskslistAC = (id: string) => ({
    type: 'REMOVE-TASKSLIST' as const,
    payload: {id}
})

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => ({
    type: 'REMOVE-TASK' as const,
    payload: {id, todolistId}
})

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => ({
    type: 'ADD-TASK' as const,
    payload: {todolistId, title}
})

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (id: string, todolistId: string, isDone: boolean) => ({
    type: 'CHANGE-STATUS' as const,
    payload: {id, todolistId, isDone}
})

type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (id: string, todolistId: string, title: string) => ({
    type: 'UPDATE-TASK' as const,
    payload: {id, todolistId, title}
})