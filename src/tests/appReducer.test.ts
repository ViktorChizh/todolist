import {appReducer, AppStateType, setAppErrorAC, setAppStatusAC} from '../app_and_store/AppReducer';

let state: AppStateType

beforeEach(() => (
    state  = {
        status: 'idle',
        error: null,
        isInitialized: false,
        timeout: false
    }
))

test('set error message to null', () => {
    // action
    const endState = appReducer(state, setAppErrorAC('same error'))
    // expect result
    expect(endState.error).toBe('same error')
    expect(endState.status).toBe('idle')
})

test('set status should be "loading"', () => {
    // action
    const endState = appReducer(state, setAppStatusAC('loading'))
    // expect result
    expect(endState.error).toBe(null)
    expect(endState.status).toBe('loading')
})