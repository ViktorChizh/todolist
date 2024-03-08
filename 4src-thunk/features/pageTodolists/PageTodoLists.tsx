import {useAppDispatch, useAppSelector} from '../../app_and_store/Store';
import {addTodolistTC, setTodolistTC, TodolistType} from './todolist/todoListsReducer';
import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper} from '@mui/material';
import {AddItemForm} from '../../components/addItemForm/AddItemForm';
import {Todolist} from './todolist/Todolist';

export const PageTodoLists = () => {
    const todoLists = useAppSelector<TodolistType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(setTodolistTC())
    }, []);

    return (
        <Container fixed style={{width: '100%', maxWidth: '100%'}}>
            <Grid container>
                <Paper elevation={5} style={{width: '100%', padding: '20px  6px 20px 20px', margin: '20px auto'}}>
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
                                <Todolist idTDL={tl.id} title={tl.title} filter={tl.filter}/>
                            </Paper>
                        </Grid>)
                })}
            </Grid>
        </Container>
    )
}