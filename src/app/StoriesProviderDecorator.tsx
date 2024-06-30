import React, { ReactNode } from "react"
import { AppState } from "./Store"
import { todoListsReducer } from "features/pageTodolists/todolist/TodoListsReducer"
import { tasksReducer } from "features/pageTodolists/todolist/tasks/TasksReducer"
import { v1 } from "uuid"
import { appReducer } from "./AppReducer"
import { thunk } from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import { loginReducer } from "features/login/loginReducer"
import { Provider } from "react-redux"

const initialState: AppState = {
  app: {
    status: "idle",
    error: null,
  },
  login: {
    isLoggedIn: false,
    isInitialized: false,
    captchaUrl: ''
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
})

export const StoriesProviderDecorator = (story: () => ReactNode) => {
  return <Provider store={storeStorebook}>{story()}</Provider>
}
