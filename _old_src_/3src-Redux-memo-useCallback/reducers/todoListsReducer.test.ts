import {
  addTodolistAC,
  changeFilterAC,
  removeTodolistAC,
  todoListsReducer,
  TodolistType,
  updateTodolistAC,
} from "./todoListsReducer"
import { v1 } from "uuid"

export let todolistId1 = v1()
export let todolistId2 = v1()
let state: TodolistType[] = []

beforeEach(
  () =>
    (state = [
      { id: todolistId1, title: "What to learn", filter: "all" },
      { id: todolistId2, title: "What to buy", filter: "all" },
    ]),
)

test("remove todoList by id", () => {
  // action
  const endState = todoListsReducer(state, removeTodolistAC(todolistId1))
  // expect result
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("add todoList by id", () => {
  // action
  const endState = todoListsReducer(state, addTodolistAC("What to watch"))
  // expect result
  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe("What to watch")
})

test("change todoList title by id", () => {
  // action
  const endState = todoListsReducer(state, updateTodolistAC(todolistId1, "What to watch"))
  // expect result
  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe("What to watch")
})

test("change todoList filter by id", () => {
  // action
  const endState = todoListsReducer(state, changeFilterAC(todolistId2, "active"))
  // expect result
  expect(endState.length).toBe(2)
  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("active")
})
