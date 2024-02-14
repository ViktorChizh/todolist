import {removeTaskAC, TaskType, updateTaskAC} from '../reducers/tasksReducer';
import React, {FC, memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Checkbox} from './Checkbox';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    onChangeHandler: (id: string, newIsDoneValue: boolean)=> void
}

export const Task: FC<TaskPropsType> = memo(({task, todolistId, onChangeHandler}) => {
    const dispatch = useDispatch()
    const onClickHandler = useCallback(()=>dispatch(removeTaskAC(task.id, todolistId)),[dispatch, todolistId, task.id])
    const updateTaskHandler = useCallback((title: string) => {
        dispatch(updateTaskAC(todolistId, task.id, title))
    },[dispatch, todolistId, task.id])

    return <li className={task.isDone ? 'is-done' : ''}>
        <Checkbox onChange={(checked: boolean) => onChangeHandler(task.id, checked)} checked={task.isDone}/>
        <EditableSpan oldTitle={task.title} callBack={updateTaskHandler}/>
        <IconButton color="primary" aria-label="delete" onClick={onClickHandler}>
            <DeleteIcon/>
        </IconButton>
    </li>
})