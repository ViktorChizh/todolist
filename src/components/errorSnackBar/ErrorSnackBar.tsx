import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from '../../app_and_store/Store';
import {setAppErrorAC} from '../../app_and_store/AppReducer';

export function ErrorSnackBar() {
    const error = useAppSelector<string | null>(state => state.app.error)
    const dispatch = useAppDispatch()


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        dispatch(setAppErrorAC(null));
    };

    return (
        <div>
            <Snackbar open={error !== null} autoHideDuration={5000} onClose={handleClose}
                 style={{left: '31vw', right:'29vw'}}>
                <Alert onClose={handleClose} severity="error" variant="filled" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}