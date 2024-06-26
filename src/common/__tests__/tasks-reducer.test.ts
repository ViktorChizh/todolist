import { addTodolistTC, removeTodolistTC, setTodolistTC } from "features/pageTodolists/todolist/TodoListsReducer"
import { ActionTypeForTest } from "common/utils"
import { TaskPriorities, TaskStatuses } from "common/enums"
import {
  addTaskTC,
  changeTaskStatusAC,
  removeTaskTC,
  setTasksTC,
  tasksReducer,
  TasksStateType,
  updateTaskTC,
} from "features/pageTodolists/todolist/tasks/TasksReducer"
import { clearDataAC } from "common/actions/common-actions"

let startState: TasksStateType
beforeEach(() => {
  const date = new Date()
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: date,
        deadline: date,
        addedDate: date,
        order: 0,
        priority: TaskPriorities.Low,
        taskStatus: "idle",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        description: "",
        startDate: date,
        deadline: date,
        addedDate: date,
        order: 0,
        priority: TaskPriorities.Low,
        taskStatus: "idle",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: date,
        deadline: date,
        addedDate: date,
        order: 0,
        priority: TaskPriorities.Low,
        taskStatus: "idle",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: "",
        startDate: date,
        deadline: date,
        addedDate: date,
        order: 0,
        priority: TaskPriorities.Low,
        taskStatus: "idle",
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        description: "",
        startDate: date,
        deadline: date,
        addedDate: date,
        order: 0,
        priority: TaskPriorities.Low,
        taskStatus: "idle",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: "",
        startDate: date,
        deadline: date,
        addedDate: date,
        order: 0,
        priority: TaskPriorities.Low,
        taskStatus: "idle",
      },
    ],
  }
})

test("taskStatus should be changed", () => {
  const action = changeTaskStatusAC({ idTDL: "todolistId1", taskId: "3", taskStatus: "succeeded" })
  const endState = tasksReducer(startState, action)
  expect(endState["todolistId1"][2].taskStatus).toBe("succeeded")
  expect(endState["todolistId2"][2].taskStatus).toBe("idle")
})
// описание вариантов типизации action
test("tasks should be added for todolist", () => {
  // 1 var
  // const action = setTasks.fulfilled(
  //   {
  //     idTDL: "todolistId1",
  //     tasks: startState["todolistId1"],
  //   },
  //   "requestId",
  //   "todolistId1",
  // )
  // 2 var
  // type SetTaskActionType = Omit<ReturnType<typeof setTasks.fulfilled>, "meta">
  // const action: SetTaskActionType = {
  //   type: setTasks.fulfilled.type,
  //   payload: {
  //     idTDL: "todolistId1",
  //     tasks: startState["todolistId1"],
  //   },
  // }
  // 3 var
  const action: ActionTypeForTest<typeof setTasksTC.fulfilled> = {
    type: setTasksTC.fulfilled.type,
    payload: { idTDL: "todolistId1", tasks: startState["todolistId1"] },
  }

  const endState = tasksReducer({ todolistId2: [], todolistId1: [] }, action)
  // 4 var
  // const fullfiled = setTasksTC.fulfilled
  // const action = createAction<Parameters<typeof fullfiled>[0]>(fullfiled.type)
  //
  // const endState = tasksReducer({ todolistId2: [], todolistId1: [] }, action({ idTDL: "todolistId1", tasks: startState["todolistId1"] }))

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(0)
})
//
test("correct task should be deleted from correct array", () => {
  const action: ActionTypeForTest<typeof removeTaskTC.fulfilled> = {
    type: removeTaskTC.fulfilled.type,
    payload: { idTDL: "todolistId2", taskId: "2" },
  }

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(2)
  expect(endState["todolistId2"].every((t) => t.id != "2")).toBeTruthy()
})
test("correct task should be added to correct array", () => {
  const date = new Date()
  const action: ActionTypeForTest<typeof addTaskTC.fulfilled> = {
    type: addTaskTC.fulfilled.type,
    payload: {
      idTDL: "todolistId2",
      newTask: {
        todoListId: "todolistId2",
        title: "juce",
        status: TaskStatuses.New,
        addedDate: date,
        deadline: date,
        description: "",
        order: 0,
        priority: 0,
        startDate: date,
        id: "id exists",
        taskStatus: "idle",
      },
    },
  }
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juce")
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)
})
test("status of specified task should be changed", () => {
  const action: ActionTypeForTest<typeof updateTaskTC.fulfilled> = {
    type: updateTaskTC.fulfilled.type,
    payload: {
      idTDL: "todolistId2",
      taskId: "2",
      model: { status: TaskStatuses.New },
    },
  }

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New)
})
test("title of specified task should be changed", () => {
  const action: ActionTypeForTest<typeof updateTaskTC.fulfilled> = {
    type: updateTaskTC.fulfilled.type,
    payload: {
      idTDL: "todolistId2",
      taskId: "2",
      model: { title: "yogurt" },
    },
  }

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"][1].title).toBe("JS")
  expect(endState["todolistId2"][1].title).toBe("yogurt")
  expect(endState["todolistId2"][0].title).toBe("bread")
})
// тесты, связанные с тудулистами
test("new array should be added when new todolist is added", () => {
  const date = new Date()
  const action: ActionTypeForTest<typeof addTodolistTC.fulfilled> = {
    type: addTodolistTC.fulfilled.type,
    payload: {
      todolist: {
        id: "blabla",
        title: "new todolist",
        order: 0,
        addedDate: date,
      },
    },
  }

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
test("propertry with todolistId should be deleted", () => {
  const action: ActionTypeForTest<typeof removeTodolistTC.fulfilled> = {
    type: removeTodolistTC.fulfilled.type,
    payload: { idTDL: "todolistId2" },
  }
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})
test("empty arrays should be added when we set todolists", () => {
  const date = new Date()
  const action: ActionTypeForTest<typeof setTodolistTC.fulfilled> = {
    type: setTodolistTC.fulfilled.type,
    payload: {
      todolists: [
        { id: "1", title: "title 1", order: 0, addedDate: date },
        { id: "2", title: "title 2", order: 0, addedDate: date },
      ],
    },
  }
  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState["1"]).toBeDefined()
  expect(endState["2"]).toBeDefined()
})
test("all tasks for all todolist should be removed", () => {
  const endState = tasksReducer(startState, clearDataAC({ tasks: {}, todolists: [] }))
  expect(endState).toEqual({})
})
