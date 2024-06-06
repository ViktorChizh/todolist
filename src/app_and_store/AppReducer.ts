const initialState: AppStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
    errorPageTimeout: 5000
}

export const appReducer = (state = initialState, action: AppReducerActionType): AppStateType => {
    switch (action.type) {
        case 'app/SET-APP-STATUS':
            return {...state, status: action.payload.status}
        case 'app/SET-APP-ERROR':
            return {...state, error: action.payload.error}
        case 'app/SET-ISINITIALIZED':
            return {...state, isInitialized: action.payload.value}
        case 'app/SET-TIMEOUT':
            return {...state, errorPageTimeout: action.payload.value}
        default:
            return state
    }
}

//types
export type StatusType ='idle' | 'loading' | 'succeeded' | 'failed'
export type AppStateType = {
    status: StatusType
    error: string | null
    isInitialized: boolean
    errorPageTimeout: number | undefined
}
export type AppReducerActionType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppIsInitializedAC>
    | ReturnType<typeof setAppTimeoutAC>
// actions
export const setAppStatusAC = (status: StatusType) => ({type: 'app/SET-APP-STATUS', payload: {status}} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'app/SET-APP-ERROR', payload: {error}} as const)
export const setAppIsInitializedAC = (value: boolean) => ({type: 'app/SET-ISINITIALIZED' as const, payload: {value}})
export const setAppTimeoutAC = (value: number | undefined) => ({type: 'app/SET-TIMEOUT', payload: {value}} as const)