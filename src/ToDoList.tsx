import React, { FC } from 'react'
import './App.css'
import {FilterValuesType} from './App';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeToDoListFilter: (filterValue: FilterValuesType) => void
}

export const ToDoList: FC<ToDoListPropsType> = ({title, tasks, removeTask, changeToDoListFilter}) => {
    const ListItems: Array<JSX.Element> = []

    for (let i = 0; i < tasks.length; i++) {
        const ListItem: JSX.Element = <li>
            <input type="checkbox" checked={tasks[i].isDone} />
            <span>{tasks[i].title} </span>
            <button onClick={()=> removeTask(tasks[i].id)}> x</button>
        </li>
        ListItems.push(ListItem)
    }

    return (
        <div className='todoList'>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {ListItems}
            </ul>
            <div>
                <button onClick={()=>changeToDoListFilter('all')}>All</button>
                <button onClick={()=>changeToDoListFilter('active')}>Active</button>
                <button onClick={()=>changeToDoListFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}
