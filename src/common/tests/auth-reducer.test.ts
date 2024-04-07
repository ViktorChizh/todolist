import { ActionTypeForTest } from "common/utils"
import { authReducer, loginTC, logoutTC, meTC } from "features/auth/authReducer"
import { appReducer } from "app/AppReducer"

let startState: { isLoggedIn: boolean }
beforeEach(() => (startState = { isLoggedIn: false }))

test("loginTC should return isLoggedIn=true", () => {
  const action: ActionTypeForTest<typeof loginTC.fulfilled> = {
    type: loginTC.fulfilled.type,
    payload: undefined,
  }

  const endState = authReducer(startState, action)

  expect(endState.isLoggedIn).toBe(true)
})

test("logouTC should return isLoggedIn=false", () => {
  const action: ActionTypeForTest<typeof logoutTC.fulfilled> = {
    type: logoutTC.fulfilled.type,
    payload: undefined,
  }

  const endState = authReducer(startState, action)

  expect(endState.isLoggedIn).toBe(false)
})

test("fulfilled me-request should return isLoggedIn=true", () => {
  const action = meTC.fulfilled(undefined, "requestId", undefined)
  const endState = authReducer(startState, action)

  expect(endState.isLoggedIn).toBe(true)
})
test("rejected me-request should return isLoggedIn=false", () => {
  const action = meTC.rejected(null, "requestId", undefined)
  const endState = authReducer(startState, action)

  expect(endState.isLoggedIn).toBe(false)
})
