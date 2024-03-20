import React, {memo} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useAppDispatch, useAppSelector} from '../../app_and_store/Store';
import {logoutTC} from '../../auth/authReducer';

function ButtonAppBar() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const onClickHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}} textAlign="center" color="secondary">
                        <h1 style={{fontSize: '50px', lineHeight: '50px', margin: '0'}}><i>Todolists</i></h1>
                    </Typography>
                    {isLoggedIn && <Button variant="outlined" color="inherit" aria-label="logout"
                                           onClick={onClickHandler}>LOGOUT</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default memo(ButtonAppBar)