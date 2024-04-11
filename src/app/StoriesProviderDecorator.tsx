import React, { ReactNode } from "react"
import { AppStateType } from "./Store"
import { todoListsReducer } from "features/pageTodolists/todolist/TodoListsReducer"
import { tasksReducer } from "features/pageTodolists/todolist/task/TasksReducer"
import { v1 } from "uuid"
import { appReducer } from "./AppReducer"
import { thunk } from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import { loginReducer } from "features/login/loginReducer"
import { Provider } from "react-redux"

const initialState: AppStateType = {
  app: {
    status: "idle",
    error: null,
    errorPage: false,
  },
  login: {
    isLoggedIn: false,
    isInitialized: false,
  },
  todolists: [
    {
      id: "todolistId1",
      title: "What to learn",
      addedDate: new Date(),
      order: 0,
      filter: "all",
      todoStatus: "idle",
    },
    {
      id: "todolistId2",
      title: "What to buy",
      addedDate: new Date(),
      order: 0,
      filter: "all",
      todoStatus: "idle",
    },
  ],
  tasks: {
    todolistId1: [
      {
        id: v1(),
        todoListId: "todolistId1",
        title: "HTML&CSS",
        status: 1,
        addedDate: new Date(),
        order: 0,
        startDate: null,
        deadline: null,
        description: "",
        priority: 0,
        taskStatus: "idle",
      },
      {
        id: v1(),
        todoListId: "todolistId1",
        title: "JS",
        status: 1,
        addedDate: new Date(),
        order: 0,
        startDate: null,
        deadline: null,
        description: "",
        priority: 0,
        taskStatus: "idle",
      },
    ],
    todolistId2: [
      {
        id: v1(),
        todoListId: "todolistId2",
        title: "Milk",
        status: 1,
        addedDate: new Date(),
        order: 0,
        startDate: null,
        deadline: null,
        description: "",
        priority: 0,
        taskStatus: "idle",
      },
      {
        id: v1(),
        todoListId: "todolistId2",
        title: "React Book",
        status: 0,
        addedDate: new Date(),
        order: 0,
        startDate: null,
        deadline: null,
        description: "",
        priority: 0,
        taskStatus: "idle",
      },
    ],
  },
}

let storeStorebook = configureStore({
  reducer: {
    app: appReducer,
    login: loginReducer,
    todolists: todoListsReducer,
    tasks: tasksReducer,
  },
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})

export const StoriesProviderDecorator = (story: () => ReactNode) => {
  return <Provider store={storeStorebook}>{story()}</Provider>
}
