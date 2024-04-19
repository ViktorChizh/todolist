import { appReducer, AppState, setAppErrorAC, setAppErrorPageAC } from "app/AppReducer"

let state: AppState

beforeEach(() => (state = { status: "idle", error: null, errorPage: false }))

test("set error message", () => {
  // action
  const endState = appReducer(state, setAppErrorAC({ error: "same error" }))
  // expect result
  expect(endState.error).toBe("same error")
  expect(endState.status).toBe("idle")
})
test("change errorPage status", () => {
  // action
  const endState = appReducer(state, setAppErrorPageAC({ errorPage: true }))
  // expect result
  expect(endState.errorPage).toBe(true)
})
