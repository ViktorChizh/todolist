import {appReducer, AppStateType, setErrorAC, setStatusAC} from '../app_and_store/AppReducer';

let state: AppStateType

beforeEach(() => (
    state  = {
        status: 'idle',
        error: null
    }
))

test('set error message to null', () => {
    // action
    const endState = appReducer(state, setErrorAC('same error'))
    // expect result
    expect(endState.error).toBe('same error')
    expect(endState.status).toBe('idle')
})

test('set status should be "loading"', () => {
    // action
    const endState = appReducer(state, setStatusAC('loading'))
    // expect result
    expect(endState.error).toBe(null)
    expect(endState.status).toBe('loading')
})