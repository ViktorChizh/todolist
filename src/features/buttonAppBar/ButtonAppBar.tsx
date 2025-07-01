import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { useActions, useAppSelector } from "common/hooks"
import { isLoggedInSelector } from "common/selectors"
import Button from "@mui/material/Button"

function ButtonAppBar() {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const { logoutTC: logout } = useActions()
  const navigate = useNavigate()
  const location = useLocation()

  const onClickErrorHandler = () => {
    if (isLoggedIn) {
      navigate("/todolists")
    } else {
      navigate("/login")
    }
  }

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
              onClick={() => {
                void logout()
              }}>
              LOGOUT
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default ButtonAppBar
