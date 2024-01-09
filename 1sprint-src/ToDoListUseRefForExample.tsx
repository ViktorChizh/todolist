import React, {FC, useRef} from 'react'
import './App.css'
import {FilterValuesType} from './App';


//  Образец работы с useRef


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>

    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeToDoListFilter: (filterValue: FilterValuesType) => void
}

export const ToDoList: FC<ToDoListPropsType> = (
    {
        title,
        tasks,
        addTask,
        removeTask,
        changeToDoListFilter
    }) => {
    const ListItems: Array<JSX.Element> = []

    for (let i = 0; i < tasks.length; i++) {
        const ListItem: JSX.Element = <li>
            <input type="checkbox" checked={tasks[i].isDone} />
            <span>{tasks[i].title} </span>
            <button onClick={()=> removeTask(tasks[i].id)}> x</button>
        </li>
        ListItems.push(ListItem)
    }
    const taskList: JSX.Element = tasks.length !== 0
        ? <ul>{ListItems}</ul>
        :  <span>Tasks list is empty</span>

    const taskTitleInput = useRef<HTMLInputElement>(null)

    const addTaskHandler = () => {
        if (taskTitleInput.current){
            const newTaskTitle = taskTitleInput.current.value
            addTask(newTaskTitle)
            taskTitleInput.current.value = ''
        }
    }

    return (
        <div className='todoList'>
            <h3>{title}</h3>
            <div>
                <input ref={taskTitleInput} />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <button onClick={()=>changeToDoListFilter('all')}>All</button>
                <button onClick={()=>changeToDoListFilter('active')}>Active</button>
                <button onClick={()=>changeToDoListFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}
