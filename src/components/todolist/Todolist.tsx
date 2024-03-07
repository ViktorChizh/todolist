import React, {FC, memo, useEffect} from 'react';
import {AddItemForm} from '../addItemForm/AddItemForm';
import {EditableSpan} from '../editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {FilterValuesType} from '../../reducers/todoListsReducer';
import {Task} from '../task/Task';
import {useTodolist} from './useTodolist';
import {fetchTasksTC} from '../../reducers/tasksReducer';
import {useAppDispatch} from '../../reducers/Store';

type PropsType = {
    idTDL: string
    title: string
    filter: FilterValuesType
}

export const Todolist: FC<PropsType> = memo(({idTDL, title, filter}) => {

    const {tasks, removeTodolist, onAllClickHandler, onActiveClickHandler,
        onCompletedClickHandler, addTaskHandler, updateTodolistHandler} = useTodolist(idTDL, filter)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(idTDL))
    }, []);

    return (
        <div>
            <h3><EditableSpan oldTitle={title} callBack={updateTodolistHandler}/>
                <IconButton color="primary" aria-label="delete" onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addTaskHandler} placeholder={'add new task'}/>
            <ul>
                {tasks.map(t => <Task key={t.id} task={t} todolistId={idTDL} />)}
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


