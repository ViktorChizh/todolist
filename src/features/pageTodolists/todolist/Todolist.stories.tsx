import { Meta, StoryObj } from "@storybook/react"
import { StoriesProviderDecorator } from "app/StoriesProviderDecorator"
import { Todolist } from "features/pageTodolists/todolist/Todolist"
import { FilterValuesType, TodolistType } from "features/pageTodolists/todolist/TodoListsReducer"
import React from "react"
import { StatusType } from "app/AppReducer"

const meta: Meta<typeof Todolist> = {
  title: "Todolist component",
  component: Todolist,
  decorators: [StoriesProviderDecorator],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Todolist>

export const TodolistExample = () => {
  let todolist: TodolistType = {
    id: "defaultTLiD",
    title: "DefaultTodolist",
    addedDate: new Date(),
    order: 0,
    filter: "all" as FilterValuesType,
    todoStatus: "idle" as StatusType,
  }
  return <Todolist todoList={todolist} />
}
