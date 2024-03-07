import {todoListsReducer} from './todoListsReducer';
import {tasksReducer} from './tasksReducer';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk, ThunkDispatch} from 'redux-thunk';

const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof rootReducer>

export type AppDispatchType = ThunkDispatch<AppStoreType, unknown, AnyAction>
//@ts-ignore
window.store = store