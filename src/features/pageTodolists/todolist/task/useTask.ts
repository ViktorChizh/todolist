import { useCallback } from "react"
import { removeTask, updateTask } from "./TasksReducer"
import { TaskType } from "../../../../api/api"
import { useDispatch } from "react-redux"

/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */
export const useTask = (task: TaskType, idTDL: string) => {
    const dispatch = useDispatch()
    const onClickHandler = useCallback(()=>dispatch(removeTask(idTDL, task.id)),[dispatch, idTDL, task.id])
    const updateTaskHandler = useCallback((title: string) => {
        dispatch(updateTask(idTDL, task.id, {title: title}))
    },[dispatch, idTDL, task.id])
    const  onChangeHandler = useCallback((e: boolean)=> {
        dispatch(updateTask(idTDL, task.id, {status: e ? 1 : 0}))}, [dispatch, idTDL, task.id])

    return {onClickHandler, updateTaskHandler, onChangeHandler}
}