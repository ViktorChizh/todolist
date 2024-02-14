import React, {FC, memo, useCallback} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {addTodolistAC, TodolistType} from './reducers/todoListsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from './reducers/Store';
import {Todolist} from './Todolist';

const App: FC = memo(() => {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppStoreType, TodolistType[]>(state => state.todolists)

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed style={{width: '100%', maxWidth: '100%'}}>
                <Grid container>
                    <Paper elevation={5} style={{width: '96%', padding: '20px  6px 20px 20px', margin: '20px auto'}}>
                        <h3 style={{textAlign: 'center'}}>Add Todolist</h3>
                        <AddItemForm callBack={addTodolist}
                                     placeholder={'add new todolist'}
                                     style={{width: '100%', maxWidth: '100%'}}/>
                        {!todoLists.length && <span style={{color: 'red', display: 'block', marginTop: '10px'}}>
                                todoLists are empty
                            </span>}
                    </Paper>
                </Grid>
                <Grid container spacing={3} style={{width: '100%', justifyContent: 'center', marginLeft: '-0.5vw'}}>
                    {todoLists.map(tl => {
                        return (
                            <Grid key={tl.id} style={{margin: '30px 15px 0'}}>
                                <Paper elevation={5} style={{padding: '20px'}}>
                                    <Todolist id={tl.id} title={tl.title} filter={tl.filter}/>
                                </Paper>
                            </Grid>)
                    })}
                </Grid>
            </Container>
        </div>
    )
})

export default App;