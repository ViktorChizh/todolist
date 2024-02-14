import React, {FC, memo, useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from './reducers/Store';
import {addTaskAC, changeStatusAC, TaskType} from './reducers/tasksReducer';
import {changeFilterAC, FilterValuesType, removeTodolistAC, updateTodolistAC} from './reducers/todoListsReducer';
import {Task} from './Task';

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const Todolist: FC<PropsType> = memo((props) => {
    let tasks = useSelector<AppStoreType, TaskType[]>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    if (props.filter === 'active') {
        tasks = tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone === true)
    }
    const removeTodolist = useCallback(() => dispatch(removeTodolistAC(props.id)),[dispatch,props.id])

    const onAllClickHandler = useCallback(()=>dispatch(changeFilterAC(props.id,'all')),[dispatch,props.id])
    const onActiveClickHandler = useCallback(()=>dispatch(changeFilterAC(props.id,'active')),[dispatch,props.id])
    const onCompletedClickHandler = useCallback(()=>dispatch(changeFilterAC(props.id,'completed')),[dispatch,props.id])
    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(props.id, title))
    },[dispatch,props.id])
    const updateTodolistHandler = useCallback((title: string) => {
        dispatch(updateTodolistAC(props.id, title))
    },[dispatch,props.id])
    const onChangeHandler = useCallback((id: string, newIsDoneValue: boolean) => {
        dispatch(changeStatusAC(id, props.id, newIsDoneValue))
    },[dispatch,props.id])

    return <div>
        <h3><EditableSpan oldTitle={props.title} callBack={updateTodolistHandler}/>
            <IconButton color="primary" aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler} placeholder={'add new task'}/>
        <ul>
            {tasks.map(t => <Task key={t.id} task={t} todolistId={props.id} onChangeHandler={onChangeHandler}/>)}
        </ul>
        {!tasks.length && <span style={{color: 'red', display: 'block', margin: '10px'}}>tasksList is empty</span>}
        <div>
            <Button style={{marginLeft: '5px'}} size="small"
                    variant={props.filter === 'all' ? 'outlined' : 'contained'} color="success"
                    onClick={onAllClickHandler}> All
            </Button>
            <Button style={{marginLeft: '5px'}} size="small"
                    variant={props.filter === 'active' ? 'outlined' : 'contained'} color="error"
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button style={{marginLeft: '5px'}} size="small"
                    variant={props.filter === 'completed' ? 'outlined' : 'contained'} color="primary"
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})


