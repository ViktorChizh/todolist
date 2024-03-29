import { addTodolist, todoListsReducer, TodolistType } from "features/pageTodolists/todolist/TodoListsReducer"
import { tasksReducer, TasksStateType } from "features/pageTodolists/todolist/task/TasksReducer"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistType> = []
  const date = new Date()
  let todolist: TodolistType = {
    title: "new todolist",
    id: "any id",
    addedDate: date,
    order: 0,
    todoStatus: "idle",
    filter: "all",
  }

  const action = addTodolist({ todolist })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
