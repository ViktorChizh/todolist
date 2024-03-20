import React, {FC} from 'react';
import {CircularProgress, Container, Grid, Paper} from '@mui/material';
import {AddItemForm} from '../../components/addItemForm/AddItemForm';
import {Todolist} from './todolist/Todolist';
import {usePageTodoList} from './usePageTodoList';
import {useAppSelector} from '../../app_and_store/Store';
import {Navigate} from 'react-router-dom';

type PageTodoListsPropsType = {
    demo?: boolean
}

export const PageTodoLists: FC<PageTodoListsPropsType> = ({demo = false}) => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    let {todoLists, addTodolist} = usePageTodoList(demo)
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

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
                                <Todolist todoList={tl} demo={demo}/>
                            </Paper>
                        </Grid>)
                })}
            </Grid>
        </Container>
    )
}