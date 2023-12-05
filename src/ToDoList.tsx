import React, { FC } from 'react'
import './App.css'

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

export const ToDoList: FC<ToDoListPropsType> = (props) => {
    const ListItems: Array<JSX.Element> = []

    for (let i = 0; i < props.tasks.length; i++) {
        const ListItem: JSX.Element = <li>
            <input type="checkbox" checked={props.tasks[i].isDone} />
            <span>{props.tasks[i].title}</span>
        </li>
        ListItems.push(ListItem)
    }

    return (
        <div className='todoList'>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {ListItems}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
