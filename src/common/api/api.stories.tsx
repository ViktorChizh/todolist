import React, { useState } from "react"
import { api, TaskType } from "common/api/api"

export default {
  title: "API",
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  const onClickHandler = () => {
    api.getTodolists().then((res) => setState(res.data))
  }
  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <button onClick={onClickHandler}>GET TODOLISTs</button>
    </>
  )
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState("")
  const onClickHandler = () => {
    title && api.createTodolist(title).then((res) => setState(res.data.data.item))
  }
  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <div>
        <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="title" />
        <button onClick={onClickHandler}>ADD TODOLIST</button>
      </div>
    </>
  )
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState("")
  const onClickHandler = () => {
    todolistId && api.deleteTodolist(todolistId).then((res) => setState(res.data))
  }
  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <div>
        <input
          style={{ width: "15%" }}
          value={todolistId}
          onChange={(e) => setTodolistId(e.currentTarget.value)}
          placeholder="todolistId"
        />
        <button onClick={onClickHandler}>DELETE TODOLIST</button>
      </div>
    </>
  )
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState("")
  const [title, setTitle] = useState("")
  const onClickHandler = () => {
    todolistId && title && api.updateTodolist(todolistId, title).then((res) => setState(res.data))
  }
  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <div>
        <input
          style={{ width: "15%" }}
          value={todolistId}
          onChange={(e) => setTodolistId(e.currentTarget.value)}
          placeholder="todolistId"
        />
        <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="title" />
        <button onClick={onClickHandler}>UPDATE TODOLIST</button>
      </div>
    </>
  )
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState("")
  const onClickHandler = () => {
    todolistId && api.getTasks(todolistId).then((res) => setState(res.data.items))
  }
  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <input
        style={{ width: "15%" }}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        placeholder="todolistId"
      />
      <button onClick={onClickHandler}>GET TASKs</button>
    </>
  )
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState("")
  const [title, setTitle] = useState("")
  const onClickHandler = () => {
    todolistId && title && api.createTask(todolistId, title).then((res) => setState(res.data.data.item))
  }
  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <input
        style={{ width: "15%" }}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        placeholder="todolistId"
      />
      <input
        style={{ width: "15%" }}
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        placeholder="title"
      />
      <button onClick={onClickHandler}>CREATE TASK</button>
    </>
  )
}
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState("")
  const [taskId, setTaskId] = useState("")
  const onClickHandler = () => {
    todolistId && taskId && api.deleteTask(todolistId, taskId).then((res) => setState(res.data))
  }
  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <input
        style={{ width: "15%" }}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        placeholder="todolistId"
      />
      <input
        style={{ width: "15%" }}
        value={taskId}
        onChange={(e) => setTaskId(e.currentTarget.value)}
        placeholder="taskId"
      />
      <button onClick={onClickHandler}>DELETE TASK</button>
    </>
  )
}
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState("")
  const [taskId, setTaskId] = useState("")
  const [task, setTask] = useState<TaskType>({
    id: "id1",
    title: "HTML&CSS",
    status: 1,
    addedDate: new Date(),
    deadline: null,
    order: 0,
    description: "",
    priority: 1,
    startDate: null,
    todoListId: "todolistId",
    taskStatus: "idle",
  })
  const onClickHandler = () => {
    ;-todolistId && taskId && task && api.updateTask(todolistId, taskId, task).then((res) => setState(res.data))
  }
  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <input
        style={{ width: "15%" }}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        placeholder="todolistId"
      />
      <input
        style={{ width: "15%" }}
        value={taskId}
        onChange={(e) => setTaskId(e.currentTarget.value)}
        placeholder="taskId"
      />
      <input
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.currentTarget.value })}
        placeholder="title"
      />
      <button onClick={onClickHandler}>UPDATE TASK</button>
    </>
  )
}
