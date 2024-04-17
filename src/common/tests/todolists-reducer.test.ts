import {
  addTodolistTC,
  changeTodoStatusAC,
  removeTodolistTC,
  setTodolistTC,
  todoListsReducer,
  TodolistType,
  updateTodolistFilterTC,
  updateTodolistTitleTC,
} from "features/pageTodolists/todolist/TodoListsReducer"
import { v1 } from "uuid"
import { StatusType } from "app/AppReducer"
import { TodolistServerType } from "common/api/api"
import { ActionTypeForTest } from "common/utils"
import { tasksReducer } from "features/pageTodolists/todolist/task/TasksReducer"
import { clearDataAC } from "common/actions/common-actions"
import { createAction } from "@reduxjs/toolkit"

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType> = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  const date = new Date()
  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      todoStatus: "idle",
      addedDate: date,
      order: 0,
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      todoStatus: "idle",
      addedDate: date,
      order: 0,
    },
  ]
})

test("correct todolist should be removed", () => {
  const action: ActionTypeForTest<typeof removeTodolistTC.fulfilled> = {
    type: removeTodolistTC.fulfilled.type,
    payload: { idTDL: todolistId1 },
  }
  const endState = todoListsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const date = new Date()
  let todolist: TodolistServerType = {
    title: "New Todolist",
    id: "any id",
    addedDate: date,
    order: 0,
  }
  const action: ActionTypeForTest<typeof addTodolistTC.fulfilled> = {
    type: addTodolistTC.fulfilled.type,
    payload: { todolist },
  }
  const endState = todoListsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(todolist.title)
  expect(endState[0].filter).toBe("all")
})

test("correct todolist should change its title", () => {
  const action: ActionTypeForTest<typeof updateTodolistTitleTC.fulfilled> = {
    type: updateTodolistTitleTC.fulfilled.type,
    payload: { idTDL: todolistId2, title: "New Todolist" },
  }
  const endState = todoListsReducer(startState, action)

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe("New Todolist")
})

test("correct filter of todolist should be changed", () => {
  const action: ActionTypeForTest<typeof updateTodolistFilterTC.fulfilled> = {
    type: updateTodolistFilterTC.fulfilled.type,
    payload: { idTDL: todolistId2, filter: "completed" },
  }
  const endState = todoListsReducer(startState, action)

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("completed")
})
test("todolists should be added", () => {
  const action: ActionTypeForTest<typeof setTodolistTC.fulfilled> = {
    type: setTodolistTC.fulfilled.type,
    payload: { todolists: startState },
  }
  const endState = todoListsReducer([], action)

  expect(endState.length).toBe(2)
})
test("correct entity status of todolist should be changed", () => {
  let newStatus: StatusType = "loading"

  const action = changeTodoStatusAC({ idTDL: todolistId2, todoStatus: newStatus })

  const endState = todoListsReducer(startState, action)

  expect(endState[0].todoStatus).toBe("idle")
  expect(endState[1].todoStatus).toBe(newStatus)
})
test("all todolist should be removed", () => {
  const endState = todoListsReducer(startState, clearDataAC({ tasks: {}, todolists: [] }))
  expect(endState).toEqual([])
})
