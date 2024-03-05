import React, {FC, memo} from 'react'
import IconButton from '@mui/material/IconButton'
import QueueSharpIcon from '@mui/icons-material/QueueSharp';
import TextField from '@mui/material/TextField';
import {useAddItemForm} from './useAddItemForm';

type AddItemProps = {
    callBack: (title: string) => void
    placeholder: string
    style?: { [key: string]: string }
}

export const AddItemForm: FC<AddItemProps> = memo(({callBack, placeholder, style}) => {

    const {title, error, addTask, onChangeHandler, onKeyPressHandler} = useAddItemForm(callBack)

    return (
        <div style={{width:'100%',maxWidth: '100%', marginLeft:'-5wh', display: 'flex', flexWrap:'nowrap'}}>
            <TextField placeholder={placeholder}
                       id="outlined-basic"
                       label={error ? error : placeholder}
                       variant="outlined"
                       size="small"
                       value={title}
                       error={!!error}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       style={style}
                       autoComplete='of'
            />
            <IconButton style={{ minWidth: '40px',  minHeight: '40px', }}
                        color="primary" aria-label="add item" onClick={addTask}>
                <QueueSharpIcon/>
            </IconButton>
        </div>
    )
})