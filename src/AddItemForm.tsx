import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react'

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
        if (e.charCode === 13) {
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
            < button onClick = {addTask} >+</button>
            { error && <div className = 'error-message' > {error} </div>}
        </div>
    )
}