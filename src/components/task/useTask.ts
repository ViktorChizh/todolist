import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {changeStatusAC, removeTaskAC, TaskType, updateTaskAC} from '../../reducers/tasksReducer';

/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */

export const useTask = (task: TaskType, todolistId: string) => {
    const dispatch = useDispatch()
    const onClickHandler = useCallback(()=>dispatch(removeTaskAC(task.id, todolistId)),[dispatch, todolistId, task.id])
    const updateTaskHandler = useCallback((title: string) => {
        dispatch(updateTaskAC(todolistId, task.id, title))
    },[dispatch, todolistId, task.id])
    const  onChangeHandler = useCallback((e: boolean)=> {
        dispatch(changeStatusAC(task.id, todolistId, e))}, [dispatch,task.id, todolistId])

    return {onClickHandler, updateTaskHandler, onChangeHandler}
}