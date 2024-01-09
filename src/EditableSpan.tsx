import React, {ChangeEvent, useState} from 'react'

type EditableSpanProps = {
    oldTitle: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanProps) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)
    const editFoo = () => {
        setEdit(!edit)
        edit && addTask()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }
    const addTask = () => {
        props.callBack(newTitle)
    }

    return (
            edit
            ? <input onBlur={editFoo} value={newTitle} onChange={onChangeHandler} autoFocus/>
            : <span onDoubleClick={editFoo} >{props.oldTitle}</span>
    )
} 