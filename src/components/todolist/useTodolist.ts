import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../reducers/Store';
import {addTaskAC, TaskType} from '../../reducers/tasksReducer';
import {useCallback, useMemo} from 'react';
import {changeFilterAC, FilterValuesType, removeTodolistAC, updateTodolistAC} from '../../reducers/todoListsReducer';

/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */

export const useTodolist = (idTDL: string, filter: FilterValuesType) => {
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

    return {tasks, removeTodolist, onAllClickHandler, onActiveClickHandler,
        onCompletedClickHandler, addTaskHandler, updateTodolistHandler}
}