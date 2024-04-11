import { appReducer, AppStateType, setAppErrorAC, setAppErrorPageAC, setAppStatusAC } from "app/AppReducer"
import { ActionTypeForTest } from "common/utils"
import { loginReducer, logoutTC, meTC } from "features/login/loginReducer"

let state: AppStateType

beforeEach(() => (state = { status: "idle", error: null, errorPage: false }))

test("set error message", () => {
  // action
  const endState = appReducer(state, setAppErrorAC({ error: "same error" }))
  // expect result
  expect(endState.error).toBe("same error")
  expect(endState.status).toBe("idle")
})

test('set status should be "loading"', () => {
  // action
  const endState = appReducer(state, setAppStatusAC({ status: "loading" }))
  // expect result
  expect(endState.error).toBe(null)
  expect(endState.status).toBe("loading")
})
test("change errorPage status", () => {
  // action
  const endState = appReducer(state, setAppErrorPageAC({ errorPage: true }))
  // expect result
  expect(endState.errorPage).toBe(true)
})
