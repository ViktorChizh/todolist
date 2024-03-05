import {ChangeEvent, useState} from 'react';

/**
 * Вынесли всю логику в кастомный хук в качестве примера
 */
export const useEditableSpan = (oldTitle: string, callBack: (newTitle: string) => void) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)

    const addTask = () => {
        callBack(newTitle)
    }
    const editFoo = () => {
        setEdit(!edit)
        if (edit !== false) {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return {edit, newTitle, editFoo, onChangeHandler}
}