import { addTaskAC, changeStatusAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC } from "./tasksReducer"
import { addTodolistAC, removeTodolistAC } from "./todoListsReducer"
import { v1 } from "uuid"
import { todolistId1, todolistId2 } from "./todoListsReducer.test"

let state: TasksStateType

beforeEach(
  () =>
    (state = {
      [todolistId1]: [
        { id: "id1", title: "HTML&CSS", isDone: true },
        { id: "id2", title: "JS", isDone: true },
      ],
      [todolistId2]: [
        { id: "id1", title: "Milk", isDone: true },
        { id: "id2", title: "React Book", isDone: true },
      ],
    }),
)

test("remove task by id", () => {
  // action
  const endState = tasksReducer(state, removeTaskAC("id2", todolistId1))
  // expect result
  expect(endState[todolistId1].length).toBe(1)
  expect(endState[todolistId1][0].id).toBe("id1")
  expect(endState[todolistId2].length).toBe(2)
  expect(endState).toEqual({
    // сравнивает не ссылки объектов, а именно свойства и их значения
    [todolistId1]: [{ id: "id1", title: "HTML&CSS", isDone: true }],
    [todolistId2]: [
      { id: "id1", title: "Milk", isDone: true },
      { id: "id2", title: "React Book", isDone: true },
    ],
  })
})

test("add task by id", () => {
  // action
  const endState = tasksReducer(state, addTaskAC(todolistId1, "newTask"))
  // expect result
  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][0].title).toBe("newTask") // проверяем, какой title добавили в новую таску
  expect(endState[todolistId1][0].id).toBeDefined() // проверяем, добавили ли айди в новую таску
  expect(endState[todolistId1][0].isDone).toBe(false) // проверяем, добавили ли isDone в новую таску
  expect(endState[todolistId2].length).toBe(2)
})

test("change task status by id", () => {
  // action
  const endState = tasksReducer(state, changeStatusAC("id1", todolistId1, false))
  // expect result
  expect(endState[todolistId1][0].isDone).toBe(false)
  // Два объекта с одинаковыми айди. Проверяем, что второй не изменился
  expect(endState[todolistId2][0].isDone).toBe(true)
})

test("update task title by id", () => {
  // action
  const endState = tasksReducer(state, updateTaskAC(todolistId1, "id1", "react"))
  // expect result
  expect(endState[todolistId1].length).toBe(2)
  expect(endState[todolistId1][0].title).toBe("react")
  expect(endState[todolistId1][1].title).toBe("JS")
})

test("new array should be added when new todolist is added", () => {
  const action = addTodolistAC("new todolist")

  const endState = tasksReducer(state, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2)
  if (!newKey) {
    throw Error("new key should be added")
  }
  expect(keys.length).toBe(3) // проверяем, добавился ли новый объект
  expect(endState[newKey]).toEqual([]) // фйди нового тудулиста не равна пре
})

test("property with todolistId should be deleted", () => {
  const action = removeTodolistAC(todolistId2)

  const endState = tasksReducer(state, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})
