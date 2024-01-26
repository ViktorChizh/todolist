import React, {ChangeEvent, FC} from 'react';

type CheckBoxType = {
    checked: boolean
    onChange: (checked: boolean) => void
}
export const Checkbox: FC<CheckBoxType> = ({checked, onChange}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.checked)
    }
    return <input type="checkbox" onChange={onChangeHandler} checked={checked}/>
}