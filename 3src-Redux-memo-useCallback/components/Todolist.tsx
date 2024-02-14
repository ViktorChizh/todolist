import React, {FC, memo, useCallback, useMemo} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../reducers/Store';
import {addTaskAC, changeStatusAC, TaskType} from '../reducers/tasksReducer';
import {changeFilterAC, FilterValuesType, removeTodolistAC, updateTodolistAC} from '../reducers/todoListsReducer';
import {Task} from './Task';

type PropsType = {
    idTDL: string
    title: string
    filter: FilterValuesType
}

export const Todolist: FC<PropsType> = memo(({idTDL, title, filter}) => {

    let tasks = useSelector<AppStoreType, TaskType[]>(state => state.tasks[idTDL])
    const dispatch = useDispatch()
    useMemo(() => {
        if (filter === 'active') {
            tasks = tasks.filter(t => t.isDone === false)
        }
        if (filter === 'completed') {
            tasks = tasks.filter(t => t.isDone === true)
        }
        return tasks
    }, [filter, tasks]) // МОЖНО И БЕЗ ПЕРЕМЕННОЙ
    // если через переменную: tasks = useMemo( () => {тот же код},[filter, tasks])

    const removeTodolist = useCallback(() => dispatch(removeTodolistAC(idTDL)), [dispatch, idTDL])
    const onAllClickHandler = useCallback(() => dispatch(changeFilterAC(idTDL, 'all')), [dispatch, idTDL])
    const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC(idTDL, 'active')), [dispatch, idTDL])
    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC(idTDL, 'completed')), [dispatch, idTDL])
    const addTaskHandler = useMemo(() => {
        return (title: string) => {
            dispatch(addTaskAC(idTDL, title))
        }
    }, [dispatch, idTDL])//чисто попробовать useMemo
    const updateTodolistHandler = useCallback((title: string) => {
        dispatch(updateTodolistAC(idTDL, title))
    }, [dispatch, idTDL])
    const onChangeHandler = useCallback((id: string, newIsDoneValue: boolean) => {
        dispatch(changeStatusAC(id, idTDL, newIsDoneValue))
    }, [dispatch, idTDL])

    return (
        <div>
            <h3><EditableSpan oldTitle={title} callBack={updateTodolistHandler}/>
                <IconButton color="primary" aria-label="delete" onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addTaskHandler} placeholder={'add new task'}/>
            <ul>
                {tasks.map(t => <Task key={t.id} task={t} todolistId={idTDL} onChangeHandler={onChangeHandler}/>)}
            </ul>
            {!tasks.length && <span style={{color: 'red', display: 'block', margin: '10px'}}>tasksList is empty</span>}
            <div
                style={{display: 'flex', gap: '5px', margin: '0 auto', width: '100%', justifyContent: 'space-between'}}>
                <Button size="small" onClick={onAllClickHandler} color="success"
                        variant={filter === 'all' ? 'outlined' : 'contained'}> All </Button>
                <Button size="small" onClick={onActiveClickHandler} color="error"
                        variant={filter === 'active' ? 'outlined' : 'contained'}> Active </Button>
                <Button size="small" onClick={onCompletedClickHandler} color="primary"
                        variant={filter === 'completed' ? 'outlined' : 'contained'}> Completed </Button>
            </div>
        </div>
    )
})


