import React, { memo, useCallback } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { useLocation, useNavigate } from "react-router-dom"
import { useActions, useAppDispatch, useAppSelector } from "common/hooks"
import { isLoggedInSelector } from "common/selectors"
import { setAppErrorPageAC } from "common/actions"

function ButtonAppBar() {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const { logoutTC: logout } = useActions()
  const dispatch = useAppDispatch()
  // строки 19-32 просто для тренировки использования новых хуков
  const navigate = useNavigate()
  const location = useLocation()

  const onClickErrorHandler = useCallback(() => {
    if (isLoggedIn) {
      navigate("/todolists")
    } else {
      navigate("/login")
    }
    dispatch(setAppErrorPageAC({ errorPage: false }))
  }, [])

  const onClickHandler = useCallback(() => {
    logout()
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign="center" color="secondary">
            <h1 style={{ fontSize: "50px", lineHeight: "50px", margin: "0" }}>
              <i>Todolists</i>
            </h1>
          </Typography>
          {location.pathname === "/error404" && (
            <Button variant="contained" color="secondary" aria-label="logout" onClick={onClickErrorHandler}>
              BACK
            </Button>
          )}
          {isLoggedIn && (
            <Button
              variant="outlined"
              color="inherit"
              aria-label="logout"
              style={{ marginLeft: "10px" }}
              onClick={onClickHandler}>
              LOGOUT
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default memo(ButtonAppBar)
