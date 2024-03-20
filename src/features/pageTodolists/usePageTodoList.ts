import {useAppDispatch, useAppSelector} from '../../app_and_store/Store';
import {addTodolistTC, setTodolistTC} from './todolist/TodoListsReducer';
import {useCallback, useEffect} from 'react';

export const usePageTodoList = (demo: boolean) => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const todoLists = useAppSelector(state => state.todolists)
    const dispatch = useAppDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        if(demo) return
        if (!isLoggedIn)  return
        dispatch(setTodolistTC())
    }, []);

    return {todoLists, addTodolist}
}