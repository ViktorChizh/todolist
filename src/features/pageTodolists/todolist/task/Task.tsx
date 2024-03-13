import React, {FC, memo} from 'react';
import {Checkbox} from '../../../../components/checkbox/Checkbox';
import {EditableSpan} from '../../../../components/editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTask} from './useTask';
import {TaskType} from '../../../../api/todolists-api';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    todoStatus?: boolean
}

export const Task: FC<TaskPropsType> = memo(({task, todolistId, todoStatus}) => {

    const {onClickHandler, updateTaskHandler, onChangeHandler} = useTask(task, todolistId)

    return <li className={task.status ? 'is-done' : ''}>
        <Checkbox onChange={onChangeHandler} checked={!!task.status} disabled={todoStatus}/>
        <EditableSpan oldTitle={task.title} callBack={updateTaskHandler} disabled={todoStatus}/>
        <IconButton color="primary" aria-label="delete" onClick={onClickHandler} disabled={todoStatus}>
            <DeleteIcon/>
        </IconButton>
    </li>
})