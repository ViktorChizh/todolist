import { createAction } from "@reduxjs/toolkit"
import { TasksStateType } from "features/pageTodolists/todolist/tasks/task/TasksReducer"
import { TodolistType } from "features/pageTodolists/todolist/TodoListsReducer"
// пример исскуственно усложнен для изучения вхожящих параметров
//второй аргумент (пишется через запятую за типом - колбэк для подготовки пэйлоада) не рассматриваем
// еще один пример применения createAction - в таскс-тестах - 4 вариант
type ActionClearDataType = {
  tasks: TasksStateType
  todolists: TodolistType[]
}
export const clearDataAC = createAction<ActionClearDataType>("common/clearDataAC")
