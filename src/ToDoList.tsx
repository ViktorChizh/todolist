import React, {FC, memo} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {Checkbox} from './Checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from './reducers/Store';
import {addTaskAC, changeStatusAC, removeTaskAC, TaskType, updateTaskAC} from './reducers/tasksReducer';
import {changeFilterAC, FilterValuesType, removeTodolistAC, updateTodolistAC} from './reducers/todoListsReducer';

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
    const removeTodolist = () => dispatch(removeTodolistAC(props.id))

    const onAllClickHandler = () => dispatch(changeFilterAC(props.id, 'all'))
    const onActiveClickHandler = () => dispatch(changeFilterAC(props.id, 'active'))
    const onCompletedClickHandler = () => dispatch(changeFilterAC(props.id, 'completed'))

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(props.id, title))
    }
    const updateTodolistHandler = (title: string) => {
        dispatch(updateTodolistAC(props.id, title))
    }
    const onChangeHandler = (id: string, newIsDoneValue: boolean) => {
        dispatch(changeStatusAC(id, props.id, newIsDoneValue))
    }
    return <div>
        <h3><EditableSpan oldTitle={props.title} callBack={updateTodolistHandler}/>
            <IconButton color="primary" aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler} placeholder={'add new task'}/>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))

                    const updateTaskHandler = (title: string) => {
                        dispatch(updateTaskAC(props.id, t.id, title))
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox onChange={(checked: boolean) => onChangeHandler(t.id, checked)} checked={t.isDone}/>
                        <EditableSpan oldTitle={t.title} callBack={updateTaskHandler}/>
                        <IconButton color="primary" aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
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


