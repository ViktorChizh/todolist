import React from 'react'
import './App.css'
import { ToDoList } from './ToDoList'

function App() {

    const tasks1 = [
        { id: 1, title: 'HTML', isDone: true },
        { id: 2, title: 'CSS', isDone: true },
        { id: 3, title: 'JS', isDone: true },
        { id: 4, title: 'React', isDone: false }
    ]
    const tasks2 = [
        { id: 5, title: 'Hello world', isDone: true },
        { id: 6, title: 'I am happy', isDone: false },
        { id: 7, title: 'Yo', isDone: false }
    ]
    return (
        <div className="App">
            <ToDoList title="What to learn" tasks={tasks1} />
            <ToDoList title="Songs" tasks={tasks2} />
        </div>
    )
}

export default App;
