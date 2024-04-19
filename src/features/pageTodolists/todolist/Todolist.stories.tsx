import { Meta, StoryObj } from "@storybook/react"
import { StoriesProviderDecorator } from "app/StoriesProviderDecorator"
import { Todolist } from "features/pageTodolists/todolist/Todolist"
import { FilterValues, TodolistApp } from "features/pageTodolists/todolist/TodoListsReducer"
import React from "react"
import { Status } from "app/AppReducer"

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
  let todolist: TodolistApp = {
    id: "defaultTLiD",
    title: "DefaultTodolist",
    addedDate: new Date(),
    order: 0,
    filter: "all" as FilterValues,
    todoStatus: "idle" as Status,
  }
  return <Todolist todoList={todolist} />
}
