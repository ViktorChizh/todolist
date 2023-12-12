import React, {useState} from 'react'
import './App.css'
import { ToDoList, TaskType } from './ToDoList'

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const toDoListTitle = "What to learn"
    const [tasks,setTasks] = useState<Array<TaskType>>([
        { id: 1, title: 'HTML', isDone: true },
        { id: 2, title: 'CSS', isDone: true },
        { id: 3, title: 'JS', isDone: true },
        { id: 4, title: 'React', isDone: false }
    ])

    const [filterValue, setFilterValue] = useState <FilterValuesType>('all')

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    const changeToDoListFilter = (filterValue: FilterValuesType) => {
        setFilterValue(filterValue)
    }

    const tasksForToDoList = filterValue === 'active'
                                ? tasks.filter(t => t.isDone === false)
                                : filterValue === 'completed'
                                    ? tasks.filter(t => t.isDone === true)
                                    : tasks

    return (
        <div className="App">
            <ToDoList title={toDoListTitle}
                      tasks={tasksForToDoList}
                      removeTask={removeTask}
                      changeToDoListFilter={changeToDoListFilter}/>
        </div>
    )
}
export default App;
