import { appReducer, AppStateType, setAppErrorAC, setAppErrorPageAC, setAppStatusAC } from "app/AppReducer"
import { ActionTypeForTest } from "common/utils"
import { authReducer, logoutTC, meTC } from "features/auth/authReducer"

let state: AppStateType

beforeEach(() => (state = { status: "idle", error: null, isInitialized: false, errorPage: false }))

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

test("fulfilled me-request should return isInitialized=true", () => {
  const action = meTC.fulfilled(undefined, "requestId", undefined)
  const endState = appReducer(state, action)

  expect(endState.isInitialized).toBe(true)
})

test("rejected me-request should return isInitialized=true", () => {
  const action = meTC.rejected(null, "requestId", undefined)
  const endState = appReducer(state, action)

  expect(endState.isInitialized).toBe(true)
})
