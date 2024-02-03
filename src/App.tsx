import React, {useReducer} from 'react';
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
} from './redocers/todoListsReducer';
import {addTaskAC, changeStatusAC, removeTaskAC, tasksReducer, updateTaskAC} from './redocers/tasksReducer';

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

    // let [todolists, setTodolists] = useState<Array<TodolistType>>([
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'}
    // ])

    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    // let [tasks, setTasks] = useState<TasksStateType>({
    //     [todolistId1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: 'Milk', isDone: true},
    //         {id: v1(), title: 'React Book', isDone: true}
    //     ]
    // })

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

    function removeTask(id: string, todolistId: string) {
        // //достанем нужный массив по todolistId:
        // let todolistTasks = tasks[todolistId];
        // // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        // tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({...tasks});
        dispatchTasks(removeTaskAC(id, todolistId))
    }
    function addTask(title: string, todolistId: string) {
        // let task = {id: v1(), title: title, isDone: false};
        // //достанем нужный массив по todolistId:
        // let todolistTasks = tasks[todolistId];
        // // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        // tasks[todolistId] = [task, ...todolistTasks];
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({...tasks});s
        dispatchTasks(addTaskAC(todolistId, title))
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        // //достанем нужный массив по todolistId:
        // let todolistTasks = tasks[todolistId];
        // // найдём нужную таску:
        // let task = todolistTasks.find(t => t.id === id);
        // //изменим таску, если она нашлась
        // if (task) {
        //     task.isDone = isDone;
        //     // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        //     setTasks({...tasks});
        // }
        dispatchTasks(changeStatusAC(id, todolistId, isDone))
    }
    function changeFilter(todolistId: string, value: FilterValuesType) {
        // let todolist = todolists.find(tl => tl.id === todolistId);
        // if (todolist) {
        //     todolist.filter = value;
        //     setTodolists([...todolists])
        // }
        dispatchTodoLists(changeFilterAC(todolistId, value))
    }
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
        dispatchTasks(updateTaskAC(taskId, todolistId, title))
    }

    function removeTodolist(id: string) {
        // // засунем в стейт список тудулистов, id которых не равны удаляемому id
        // setTodolists(todolists.filter(tl => tl.id !== id));
        // // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        // delete tasks[id]; // Удаляем св-во из объекта... значением которого являлся массив тасок
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({...tasks});

        // по аналогии с добавлением тудулиста, пользуемся одним экшнкриэйтером в двух редюсерах
        dispatchTodoLists(removeTodolistAC(id))
        dispatchTasks(removeTodolistAC(id))
    }
    const addTodolist = (title: string) => {
        const todolistId = v1()
        //  в этом варианте создаются 2 экшнкриэйтора, вместо одного, что есть почти дублирование
        // dispatchTasks(addNewTaskslistAC(todolistId))
        dispatchTodoLists(addTodolistAC(todolistId, title))
        // можно просто addTodolistAC передать и в dispatchTasks, создав там соответствующую логику
        dispatchTasks(addTodolistAC(todolistId, title))
    }
    const updateTodolist = (todolistId: string, title: string) => {
        // setTodolists(todolists.map(t => t.id === todolistId ? {...t, title} : t))
        dispatchTodoLists(updateTodolistAC(todolistId, title))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed style={{width: '100%', maxWidth: '100%'}}>
                {/*<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>*/}
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
                {/*</div>*/}
                {/*<div style={{display: 'flex', flexDirection: 'row', gap: '25px'}}>*/}
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
                {/*</div>*/}
            </Container>
        </div>
    )
}

export default App;
