import { addTodolistAC, todoListsReducer, TodolistType } from "./todoListsReducer"
import { tasksReducer, TasksStateType } from "./tasksReducer"
import { v1 } from "uuid"

// тесты для случаев, когда работают 2 редюсера одновременно

test("ids should be equals", () => {
  // задаем стартовые пустые значения для редюсеров, чтобы не заморачиваться
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistType> = []

  const action = addTodolistAC("new todolist")

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.id)
  expect(idFromTodolists).toBe(action.payload.id)
})
