import { appReducer, AppState, setAppErrorAC } from "app/AppReducer"

let state: AppState

beforeEach(() => (state = { status: "idle", error: null }))

test("set error message", () => {

  const endState = appReducer(state, setAppErrorAC({ error: "same error" }))

  expect(endState.error).toBe("same error")
  expect(endState.status).toBe("idle")
})

