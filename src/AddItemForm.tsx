import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react'
import IconButton from '@mui/material/IconButton'
import QueueSharpIcon from '@mui/icons-material/QueueSharp';

type AddItemProps = {
    callBack: (title: string) => void
}

export const AddItemForm: FC<AddItemProps> = (props: AddItemProps) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) { // так показывает устаревшие свойства, но они работают!
            addTask();
        }
    }
    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
        <div>
            <input value = {title}
                    onChange = {onChangeHandler}
                    onKeyPress = {onKeyPressHandler}
                    className = {error ? 'error' : ''}
            />
            <IconButton color="primary" aria-label="add item" onClick = {addTask} >
                <QueueSharpIcon />
            </IconButton>
            { error && <div className = 'error-message' > {error} </div>}
        </div>
    )
}