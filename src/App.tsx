import React, {useCallback, useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    todoListsReducer,
    updateTodolistAC
} from './reducers/todoListsReducer';
import {addTaskAC, changeStatusAC, removeTaskAC, tasksReducer, updateTaskAC} from './reducers/tasksReducer';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'TS', isDone: true},
            {id: v1(), title: 'PHP', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Fish', isDone: true},
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    })

    const  removeTask = useCallback((id: string, todolistId: string) => {
        dispatchTasks(removeTaskAC(id, todolistId))},[])
    const  addTask = useCallback((title: string, todolistId: string) => {
        dispatchTasks(addTaskAC(todolistId, title))}, [])
    const  changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatchTasks(changeStatusAC(id, todolistId, isDone))},[])
    const  changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatchTodoLists(changeFilterAC(todolistId, value))}, [])
    const updateTask = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatchTasks(updateTaskAC(taskId, todolistId, title))},[])


    const removeTodolist = useCallback((id: string) => {
        dispatchTodoLists(removeTodolistAC(id))
        dispatchTasks(removeTodolistAC(id))},[])
    const addTodolist = useCallback((title: string) => {
        const todolistId = v1()
        dispatchTodoLists(addTodolistAC(todolistId, title))
        dispatchTasks(addTodolistAC(todolistId, title))},[])
    const updateTodolist = useCallback((todolistId: string, title: string) => {
        dispatchTodoLists(updateTodolistAC(todolistId, title))},[])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed style={{width: '100%', maxWidth: '100%'}}>
                <Grid container>
                    <Paper elevation={5} style={{width: '25%', padding: '20px  6px 20px 20px', margin: '20px auto'}}>
                        <h3 style={{textAlign: 'center'}}>Add Todolist</h3>
                        <AddItemForm callBack={addTodolist}
                                     placeholder={'add new todolist'}
                                     style={{width: '100%', maxWidth: '100%'}}/>
                        {!todoLists.length &&
                            <span style={{color: 'red', display: 'block', marginTop: '10px'}}>
                                todoLists are empty
                            </span>}
                    </Paper>
                </Grid>
                <Grid container spacing={3} style={{width: '100%', justifyContent: 'center', marginLeft: '-0.5vw'}}>
                    {
                        todoLists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;
                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }
                            return (
                                <Grid item spacing={3}>
                                    <Paper elevation={5} style={{padding: '20px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            updateTask={updateTask}
                                            updateTodolist={updateTodolist}
                                        />
                                    </Paper>
                                </Grid>)
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default App;
