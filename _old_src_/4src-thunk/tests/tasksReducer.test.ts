import {
  addTaskAC,
  removeTaskAC,
  tasksReducer,
  TasksStateType,
  updateTaskAC,
} from "../features/pageTodolists/todolist/task/tasksReducer"
import {
  addTodolistAC,
  removeTodolistAC,
  setTodolistAC,
  todoListsReducer,
} from "../features/pageTodolists/todolist/todoListsReducer"
import { todolistId1, todolistId2 } from "./todoListsReducer.test"

let state: TasksStateType
const addedDate = new Date()
beforeEach(
  () =>
    (state = {
      [todolistId1]: [
        {
          id: "id1",
          title: "HTML&CSS",
          status: 1,
          addedDate: addedDate,
          deadline: null,
          order: 0,
          description: "",
          priority: 1,
          startDate: null,
          todoListId: todolistId1,
        },
        {
          id: "id2",
          title: "JS",
          status: 1,
          addedDate: addedDate,
          deadline: null,
          order: 0,
          description: "",
          priority: 1,
          startDate: null,
          todoListId: todolistId1,
        },
      ],
      [todolistId2]: [
        {
          id: "id1",
          title: "Milk",
          status: 1,
          addedDate: addedDate,
          deadline: null,
          order: 0,
          description: "",
          priority: 1,
          startDate: null,
          todoListId: todolistId2,
        },
        {
          id: "id2",
          title: "React Book",
          status: 1,
          addedDate: addedDate,
          deadline: null,
          order: 0,
          description: "",
          priority: 1,
          startDate: null,
          todoListId: todolistId2,
        },
      ],
    }),
)

test("remove task by id", () => {
  // action
  const endState = tasksReducer(state, removeTaskAC(todolistId1, "id2"))
  // expect result
  expect(endState[todolistId1].length).toBe(1)
  expect(endState[todolistId1][0].id).toBe("id1")
  expect(endState[todolistId2].length).toBe(2)
  expect(endState).toEqual({
    // сравнивает не ссылки объектов, а именно свойства и их значения
    [todolistId1]: [
      {
        id: "id1",
        title: "HTML&CSS",
        status: 1,
        addedDate: addedDate,
        deadline: null,
        order: 0,
        description: "",
        priority: 1,
        startDate: null,
        todoListId: todolistId1,
      },
    ],
    [todolistId2]: [
      {
        id: "id1",
        title: "Milk",
        status: 1,
        addedDate: addedDate,
        deadline: null,
        order: 0,
        description: "",
        priority: 1,
        startDate: null,
        todoListId: todolistId2,
      },
      {
        id: "id2",
        title: "React Book",
        status: 1,
        addedDate: addedDate,
        deadline: null,
        order: 0,
        description: "",
        priority: 1,
        startDate: null,
        todoListId: todolistId2,
      },
    ],
  })
})

test("add task by id", () => {
  // action
  // const endState = tasksReducer(state, addTaskAC(todolistId1, 'newTask'))
  const endState = tasksReducer(
    state,
    addTaskAC({
      id: "id1",
      title: "newTask",
      status: 0,
      addedDate: addedDate,
      deadline: null,
      order: 0,
      description: "",
      priority: 1,
      startDate: null,
      todoListId: todolistId1,
    }),
  )
  // expect result
  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][0].title).toBe("newTask") // проверяем, какой title добавили в новую таску
  expect(endState[todolistId1][0].id).toBeDefined() // проверяем, добавили ли айди в новую таску
  expect(endState[todolistId1][0].status).toBe(0) // проверяем, добавили ли isDone в новую таску
  expect(endState[todolistId2].length).toBe(2)
})

test("change task status by id", () => {
  // action
  const endState = tasksReducer(state, updateTaskAC(todolistId1, "id1", { status: 0 }))
  // expect result
  expect(endState[todolistId1][0].status).toBe(0)
  // Два объекта с одинаковыми айди. Проверяем, что второй не изменился
  expect(endState[todolistId2][0].status).toBe(1)
})

test("update task title by id", () => {
  // action
  const endState = tasksReducer(state, updateTaskAC(todolistId1, "id1", { title: "react" }))
  // expect result
  expect(endState[todolistId1].length).toBe(2)
  expect(endState[todolistId1][0].title).toBe("react")
  expect(endState[todolistId1][1].title).toBe("JS")
})

test("new array should be added when new todolist is added", () => {
  const action = addTodolistAC({
    id: "todolistId3",
    title: "new Todolist",
    addedDate: new Date(),
    order: 0,
  })

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

test("empty tasks arrays should be appear", () => {
  // action
  const endState = tasksReducer(
    {},
    setTodolistAC([
      { id: todolistId1, title: "What to learn", addedDate: new Date(), order: 0 },
      { id: todolistId2, title: "What to buy", addedDate: new Date(), order: 0 },
    ]),
  )
  // expect result
  expect(endState[todolistId1].length).toBe(0)
  expect(endState[todolistId2]).toEqual([])
})
