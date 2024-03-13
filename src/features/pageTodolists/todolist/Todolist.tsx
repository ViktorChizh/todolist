import React, {FC, memo, useEffect} from 'react';
import {AddItemForm} from '../../../components/addItemForm/AddItemForm';
import {EditableSpan} from '../../../components/editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {FilterValuesType, TodolistType} from './TodoListsReducer';
import {Task} from './task/Task';
import {useTodolist} from './useTodolist';
import {fetchTasksTC} from './task/TasksReducer';
import {useAppDispatch} from '../../../app_and_store/Store';

type PropsType = {
    todoList: TodolistType
    demo?: boolean
}

export const Todolist: FC<PropsType> = memo(({todoList, demo}) => {

    const {tasks, removeTodolist, onAllClickHandler, onActiveClickHandler,
        onCompletedClickHandler, addTaskHandler, updateTodolistHandler} = useTodolist(todoList.id, todoList.filter)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(demo) return
        dispatch(fetchTasksTC(todoList.id))
    }, []);

    return (
        <div>
            <h3><EditableSpan oldTitle={todoList.title} callBack={updateTodolistHandler} disabled={todoList.todoStatus==='loading'}/>
                <IconButton color="primary" aria-label="delete" onClick={removeTodolist} disabled={todoList.todoStatus==='loading'}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addTaskHandler} placeholder={'add new task'} disabled={todoList.todoStatus==='loading'}/>
            <ul>
                {tasks.map(t => <Task key={t.id} task={t} todolistId={todoList.id} todoStatus={todoList.todoStatus==='loading'}/>)}
            </ul>
            {!tasks.length && <span style={{color: 'red', display: 'block', margin: '10px'}}>tasksList is empty</span>}
            <div
                style={{display: 'flex', gap: '5px', margin: '0 auto', width: '100%', justifyContent: 'space-between'}}>
                <Button size="small" onClick={onAllClickHandler} color="success" disabled={todoList.todoStatus==='loading'}
                        variant={todoList.filter === 'all' ? 'outlined' : 'contained'}> All </Button>
                <Button size="small" onClick={onActiveClickHandler} color="error" disabled={todoList.todoStatus==='loading'}
                        variant={todoList.filter === 'active' ? 'outlined' : 'contained'}> Active </Button>
                <Button size="small" onClick={onCompletedClickHandler} color="primary" disabled={todoList.todoStatus==='loading'}
                        variant={todoList.filter === 'completed' ? 'outlined' : 'contained'}> Completed </Button>
            </div>
        </div>
    )
})


