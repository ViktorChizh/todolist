const initialState: AppStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state = initialState, action: AppReducerActionType): AppStateType => {
    switch (action.type) {
        case 'SET-STATUS':
            return {...state, status: action.payload.status}
        case 'SET-ERROR':
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

//types
export type StatusType ='idle' | 'loading' | 'successed' | 'failed'
export type AppStateType = {status: StatusType, error: string | null}

export type AppReducerActionType = ReturnType<typeof setErrorAC> | ReturnType<typeof setStatusAC>
// actions
export const setStatusAC = (status: StatusType) => ({type: 'SET-STATUS', payload: {status}} as const)
export const setErrorAC = (error: string | null) => ({type: 'SET-ERROR', payload: {error}} as const)