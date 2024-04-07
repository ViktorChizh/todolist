import React from "react"
import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { FormikHelpers, useFormik } from "formik"
import { isLoggedInSelector, loginTC } from "features/auth/authReducer"
import { useAppDispatch, useAppSelector } from "app/Store"
import { Navigate } from "react-router-dom"

export const Login = () => {
  let dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  const formik = useFormik({
    initialValues: {
      email: "free@samuraijs.com",
      password: "free",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = "Email is required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }
      if (!values.password) {
        errors.password = "Password is required"
      } else if (!/.{4,}/i.test(values.password)) {
        errors.password = "Password must be 4 characters or more"
      }
      return errors
    },
    onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
      const res = await dispatch(loginTC(values))
      if (loginTC.rejected.match(res)) {
        if (res.payload?.field?.length) {
          res.payload.field.forEach((er) => formikHelpers.setFieldError(`${er.field}`, `${er.error}`))
        }
      }
      if (loginTC.fulfilled.match(res)) {
        formik.resetForm()
      }
    },
  })

  if (isLoggedIn) {
    return <Navigate to={"/todolists"} />
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered &nbsp;
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                  here
                </a>
              </p>
              <p style={{ color: "lightgreen" }}>or use common test account credentials:</p>
              <p style={{ color: "lightgreen" }}>
                <strong>
                  <i>Email: </i>&nbsp;&nbsp;
                </strong>
                free@samuraijs.com
              </p>
              <p style={{ color: "lightgreen" }}>
                <strong>
                  <i>Password: </i>&nbsp;&nbsp;
                </strong>
                free
              </p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}
              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
              <FormControlLabel
                label="Remember me"
                control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
              />
              {!!formik.values.captcha && (
                <TextField label="captcha" margin="normal" {...formik.getFieldProps("captcha")} />
              )}
              {formik.touched.captcha && formik.errors.captcha && (
                <div style={{ color: "red" }}>{formik.errors.captcha}</div>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!(!formik.errors.email && !formik.errors.password)}>
                LOGIN
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
// types
type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
  captcha?: string
}
type FormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}
