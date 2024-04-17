import * as React from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { useActions, useAppSelector } from "common/hooks"
import { errorAppSelector } from "common/selectors"

export function ErrorSnackBar() {
  const error = useAppSelector(errorAppSelector)
  const { setAppErrorAC } = useActions()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return
    setAppErrorAC({ error: null })
  }

  return (
    <div>
      <Snackbar
        open={error !== null}
        autoHideDuration={5000}
        onClose={handleClose}
        style={{ left: "31vw", right: "29vw" }}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}
