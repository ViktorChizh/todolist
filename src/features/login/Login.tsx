import React from "react"
import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Navigate } from "react-router-dom"
import { useLogin } from "features/login/useLogin"

export const Login = () => {
  const { isLoggedIn, formik, captchaUrl } = useLogin()

  if (isLoggedIn) return <Navigate to={"/todolists"} />

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered &nbsp;
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
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
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label="Remember me"
                control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
              />
              {captchaUrl && <img src={captchaUrl} width='100%' height='100px' alt=''/>}
              {captchaUrl  && (
                <TextField label="captcha" margin="normal" {...formik.getFieldProps("captcha")} />
              )}
              {formik.touched.captcha && formik.errors.captcha && (
                <div style={{ color: "red" }}>{formik.errors.captcha}</div>
              )}
              <Button
                style={{marginTop: '20px'}}
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
