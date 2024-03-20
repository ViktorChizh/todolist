import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useFormik} from 'formik';
import {loginTC} from '../../auth/authReducer';
import {useAppDispatch, useAppSelector} from '../../app_and_store/Store';
import {Navigate} from 'react-router-dom';

export const Login = () => {
    let dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: 'free@samuraijs.com',
            password: 'free',
            rememberMe: true,
        },
        validate: values => {

            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            } else if (!values.password) {
                errors.password = 'Password required'
            } else if (!/.{4,}/i.test(values.password)) {
                errors.password = 'Password must be 4 simbols or more'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })
    if (isLoggedIn) {
        return <Navigate to={'/todolists'} />
    }
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                &nbsp;<a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                                here
                            </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p><strong><i>Email: </i>&nbsp;&nbsp;</strong>free@samuraijs.com</p>
                            <p><strong><i>Password: </i>&nbsp;&nbsp;</strong>free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                                // name="email"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email
                                ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                                : null}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                                // name="password"
                                // onChange={formik.handleChange}
                                // value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password
                                ? <div style={{color: 'red'}}>{formik.errors.password}</div>
                                : null}
                            <FormControlLabel
                                label="Remember me"
                                control={
                                    <Checkbox
                                        onChange={formik.handleChange}
                                        checked={formik.values.rememberMe}
                                        name="rememberMe"
                                    />
                                }
                            />
                            <Button type="submit" variant="contained" color="primary">
                                LOGIN
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captcha?: string
}