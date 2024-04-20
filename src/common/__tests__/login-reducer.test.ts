import { ActionTypeForTest } from "common/utils"
import { loginReducer, loginTC, logoutTC, meTC } from "features/login/loginReducer"
import { useLogin } from "features/login/useLogin"

let startState: { isLoggedIn: boolean; isInitialized: boolean }
beforeEach(() => (startState = { isLoggedIn: false, isInitialized: false }))

test("loginTC should return isLoggedIn=true", () => {
  const action: ActionTypeForTest<typeof loginTC.fulfilled> = {
    type: loginTC.fulfilled.type,
    payload: { isLoggedIn: true },
  }

  const endState = loginReducer(startState, action)

  expect(endState.isLoggedIn).toBe(true)
})

test("logouTC should return isLoggedIn=false", () => {
  const action: ActionTypeForTest<typeof logoutTC.fulfilled> = {
    type: logoutTC.fulfilled.type,
    payload: { isLoggedIn: false },
  }

  const endState = loginReducer(startState, action)

  expect(endState.isLoggedIn).toBe(false)
})

test("fulfilled me-request should return isLoggedIn=true", () => {
  const action = meTC.fulfilled({ isLoggedIn: true }, "requestId", undefined)
  const endState = loginReducer(startState, action)

  expect(endState.isLoggedIn).toBe(true)
})
test("rejected me-request should return isLoggedIn=false", () => {
  const action = meTC.rejected(null, "requestId", undefined)
  const endState = loginReducer(startState, action)

  expect(endState.isLoggedIn).toBe(false)
})

test("fulfilled me-request should return isInitialized=true", () => {
  const action = meTC.fulfilled({ isLoggedIn: true }, "requestId", undefined)
  const endState = loginReducer(startState, action)

  expect(endState.isInitialized).toBe(true)
})

test("rejected me-request should return isInitialized=true", () => {
  const action = meTC.rejected(null, "requestId", undefined)
  const endState = loginReducer(startState, action)

  expect(endState.isInitialized).toBe(true)
})
