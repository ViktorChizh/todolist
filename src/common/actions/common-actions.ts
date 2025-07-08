import { createAction } from "@reduxjs/toolkit"
import { TasksState } from "features/pageTodolists/todolist/tasks/TasksReducer"
import { TodolistApp } from "features/pageTodolists/todolist/TodoListsReducer"
// пример искусственно усложнен для изучения входящих параметров
//второй аргумент (пишется через запятую за типом - колбэк для подготовки пэйлоада) не рассматриваем
// еще один пример применения createAction - в таскс-тестах - 4 вариант
type ActionClearDataType = {
  tasks: TasksState
  todolists: TodolistApp[]
}
export const clearDataAC = createAction<ActionClearDataType>("common/clearDataAC")
