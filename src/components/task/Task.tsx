import {TaskType} from '../../reducers/tasksReducer';
import React, {FC, memo} from 'react';
import {Checkbox} from '../Checkbox';
import {EditableSpan} from '../editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTask} from './useTask';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task: FC<TaskPropsType> = memo(({task, todolistId}) => {

    const {onClickHandler, updateTaskHandler, onChangeHandler} = useTask(task, todolistId)

    return <li className={task.isDone ? 'is-done' : ''}>
        <Checkbox onChange={onChangeHandler} checked={task.isDone}/>
        <EditableSpan oldTitle={task.title} callBack={updateTaskHandler}/>
        <IconButton color="primary" aria-label="delete" onClick={onClickHandler}>
            <DeleteIcon/>
        </IconButton>
    </li>
})