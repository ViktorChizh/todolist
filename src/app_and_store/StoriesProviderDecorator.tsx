import { Provider } from "react-redux"
import React from "react"
import { todoListsReducer } from "features/pageTodolists/todolist/TodoListsReducer"
import { tasksReducer } from "features/pageTodolists/todolist/task/TasksReducer"
import { combineReducers } from "redux"
import { v1 } from "uuid"
import { appReducer } from "./AppReducer"
import { AppStateType } from "./Store"
import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "auth/authReducer"
import { thunk } from "redux-thunk"

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  todolists: todoListsReducer,
  tasks: tasksReducer,
})
// const initialState: AppStateType = {
//   app: {
//     status: "idle",
//     error: null,
//     isInitialized: false,
//     errorPage: true,
//     timeout: 5000,
//   },
//   auth: {
//     isLoggedIn: false,
//   },
//   todolists: [
//     {
//       id: "todolistId1",
//       title: "What to learn",
//       addedDate: new Date(),
//       order: 0,
//       filter: "all",
//       todoStatus: "idle",
//     },
//     {
//       id: "todolistId2",
//       title: "What to buy",
//       addedDate: new Date(),
//       order: 0,
//       filter: "all",
//       todoStatus: "idle",
//     },
//   ],
//   tasks: {
//     todolistId1: [
//       {
//         id: v1(),
//         todoListId: "todolistId1",
//         title: "HTML&CSS",
//         status: 1,
//         addedDate: new Date(),
//         order: 0,
//         startDate: null,
//         deadline: null,
//         description: "",
//         priority: 0,
//         taskStatus: "idle",
//       },
//       {
//         id: v1(),
//         todoListId: "todolistId1",
//         title: "JS",
//         status: 1,
//         addedDate: new Date(),
//         order: 0,
//         startDate: null,
//         deadline: null,
//         description: "",
//         priority: 0,
//         taskStatus: "idle",
//       },
//     ],
//     todolistId2: [
//       {
//         id: v1(),
//         todoListId: "todolistId2",
//         title: "Milk",
//         status: 1,
//         addedDate: new Date(),
//         order: 0,
//         startDate: null,
//         deadline: null,
//         description: "",
//         priority: 0,
//         taskStatus: "idle",
//       },
//       {
//         id: v1(),
//         todoListId: "todolistId2",
//         title: "React Book",
//         status: 0,
//         addedDate: new Date(),
//         order: 0,
//         startDate: null,
//         deadline: null,
//         description: "",
//         priority: 0,
//         taskStatus: "idle",
//       },
//     ],
//   },
// }

let storeStorebook = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
  // preloadedState: initialState,
})

export const StoriesProviderDecorator = (story: any) => {
  return <Provider store={storeStorebook}>{story()}</Provider>
}
