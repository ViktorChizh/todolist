import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {removeTaskTC, updateTaskTC} from '../../reducers/tasksReducer';
import {TaskType} from '../../api/todolists-api';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */

export const useTask = (task: TaskType, idTDL: string) => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()
    const onClickHandler = useCallback(()=>dispatch(removeTaskTC(idTDL, task.id)),[dispatch, idTDL, task.id])
    const updateTaskHandler = useCallback((title: string) => {
        dispatch(updateTaskTC(idTDL, task.id, {title: title}))
    },[dispatch, idTDL, task.id])
    const  onChangeHandler = useCallback((e: boolean)=> {
        dispatch(updateTaskTC(idTDL, task.id, {status: e ? 1 : 0}))}, [dispatch, idTDL, task.id])

    return {onClickHandler, updateTaskHandler, onChangeHandler}
}