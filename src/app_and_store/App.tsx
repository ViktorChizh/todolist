import React, {FC, memo} from 'react';
import './App.css';
import ButtonAppBar from '../features/buttonAppBar/ButtonAppBar';
import {PageTodoLists} from '../features/pageTodolists/PageTodoLists';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackBar} from '../components/errorSnackBar/ErrorSnackBar';
import {useAppSelector} from './Store';
import {StatusType} from './AppReducer';

type AppPropsType = {
    demo?: boolean
}

export const App: FC<AppPropsType> = memo(({demo = false}) => {
    const status = useAppSelector<StatusType>(state => state.app.status)
    return (
        <div className="App">
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress color="error"/>}
            <PageTodoLists demo={demo}/>
            <ErrorSnackBar/>
        </div>
    )
})

