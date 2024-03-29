import {
  addTodolistAC,
  todoListsReducer,
  TodolistType,
} from "../features/pageTodolists/todolist/todoListsReducer"
import { tasksReducer, TasksStateType } from "../features/pageTodolists/todolist/task/tasksReducer"
import { todolistId1 } from "./todoListsReducer.test"
// тесты для случаев, когда работают 2 редюсера одновременно
test("ids should be equals", () => {
  // задаем стартовые пустые значения для редюсеров, чтобы не заморачиваться
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistType> = []

  const action = addTodolistAC({
    id: "todolistId3",
    title: "new Todolist",
    addedDate: new Date(),
    order: 0,
  })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
