import {TaskType} from '../Todolist';
import {v1} from 'uuid';

export const tasksReducer = (state: TaskType[], action: TaskReducerType):TaskType[] => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // let filteredTasks = tasks.filter(t => t.id != id);
            // setTasks(filteredTasks);
            return state.filter(t => t.id != action.payload.id)
        }
        case 'ADD-TASK': {
            let newTask = { id: v1(), title: action.payload.title, isDone: false };
            // let newTasks = [task, ...tasks];
            // setTasks(newTasks);
            return [...state, newTask]
        }
        default: return state
    }
}

type TaskReducerType = removeTaskACType | AddTaskACType// по мере добавления редьюсеров через | добавляем их типизацию

type removeTaskACType = ReturnType<typeof removeTaskAC>
//ReturnType типизирует только то, что возвращает (ретурнит) функция

export  const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload:{id}
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>

export  const addTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        payload:{title}
    } as const
}