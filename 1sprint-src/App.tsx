import React, {useState} from 'react'
import './App.css'
import { ToDoList } from './ToDoList'
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'
function App() {
    const toDoListTitle = "What to learn"
    const [tasks,setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: 'HTML', isDone: true },
        { id: v1(), title: 'CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'React', isDone: false }
    ])
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const [filterValue, setFilterValue] = useState <FilterValuesType>('all')

    const tasksForToDoList = filterValue === 'active'
        ? tasks.filter(t => !t.isDone)
        : filterValue === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks

    const changeToDoListFilter = (filterValue: FilterValuesType) => {
        setFilterValue(filterValue)
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,          //title: title
            isDone: false
        }
        const nextState: Array<TaskType> = [newTask ,...tasks]
        setTasks(nextState)
        //  setTasks([{id: v1(),title,isDone: false}, ...tasks]) - тоже самое в одну строку
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        const nextState: Array<TaskType> = tasks.map(
            t => t.id === taskId ? {...t, isDone: newIsDone} : t)
        setTasks((nextState))
    }

    return (
        <div className="App">
            <ToDoList title={toDoListTitle}
                      tasks={tasksForToDoList}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeToDoListFilter={changeToDoListFilter}
                      changeTaskStatus={changeTaskStatus}
                      filterValue={filterValue}
                    />
        </div>
    )
}
export default App;
