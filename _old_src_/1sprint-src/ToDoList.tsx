import React, { FC, useState, KeyboardEvent, ChangeEvent } from "react"
import "./App.css"
import { FilterValuesType, TaskType } from "./App"
import { Button } from "./Button"

type ToDoListPropsType = {
  title: string
  tasks: Array<TaskType>
  filterValue: FilterValuesType

  addTask: (title: string) => void
  removeTask: (taskId: string) => void
  changeToDoListFilter: (filterValue: FilterValuesType) => void
  changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}
export const ToDoList: FC<ToDoListPropsType> = ({
  title,
  tasks,
  addTask,
  removeTask,
  changeToDoListFilter,
  changeTaskStatus,
  filterValue,
}) => {
  // const ListItems: Array<JSX.Element> = []          // такое может быть вместо .map()
  //
  // for (let i = 0; i < tasks.length; i++) {
  //     const ListItem: JSX.Element = <li>
  //         <input type="checkbox" checked={tasks[i].isDone} />
  //         <span>{tasks[i].title} </span>
  //         <button onClick={()=> removeTask(tasks[i].id)}> x</button>
  //     </li>
  //     ListItems.push(ListItem)
  // }
  const taskList: JSX.Element =
    tasks.length !== 0 ? (
      <ul>
        {tasks.map((task) => {
          const onCLickHandler = () => removeTask(task.id)
          return (
            <li key={task.id} className={task.isDone ? "task-done" : "task"}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
              />
              <span>{task.title} </span>
              <button onClick={onCLickHandler}>X</button>
            </li>
          )
        })}
      </ul>
    ) : (
      <span>Tasks list is empty</span>
    )

  const [taskTitle, setTaskTitle] = useState("")
  const [inputError, setInputError] = useState(false)
  const onChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
    inputError && setInputError(false) // если есть ошибка - скинь ее
  }
  const addTaskOnClickHandler = () => {
    if (taskTitle.trim()) {
      // проверка, если ввели одни пробелы .trim() удаляет пробелы
      addTask(taskTitle)
    } else {
      setInputError(true)
    }
    setTaskTitle("")
  }
  const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && taskTitle) {
      addTaskOnClickHandler()
    }
  }
  return (
    <div className="todoList">
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={onChangeEvent}
          onKeyDown={onEnterPressHandler}
          className={inputError ? "input-error" : ""}
        />
        <Button onClickHandler={addTaskOnClickHandler} isDisabled={!taskTitle} title={"+"} />
        {inputError && <div style={{ color: "red" }}>Error: title is required</div>}
      </div>
      <ul>{taskList}</ul>
      <div>
        <Button
          onClickHandler={() => changeToDoListFilter("all")}
          classes={filterValue === "all" ? "btn-active" : ""}
          title={"All"}
        />
        <Button
          onClickHandler={() => changeToDoListFilter("active")}
          classes={filterValue === "active" ? "btn-active" : ""}
          title={"Active"}
        />
        <Button
          onClickHandler={() => changeToDoListFilter("completed")}
          classes={filterValue === "completed" ? "btn-active" : ""}
          title={"Completed"}
        />
      </div>
    </div>
  )
}
