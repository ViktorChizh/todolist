import React from "react"
import { Task } from "features/pageTodolists/todolist/tasks/task/Task"
import { StoriesProviderDecorator } from "app/StoriesProviderDecorator"
import { v1 } from "uuid"
import { Meta, StoryObj } from "@storybook/react"
import { Status } from "app/AppReducer"

const meta: Meta<typeof Task> = {
  title: "Task component",
  component: Task,
  decorators: [StoriesProviderDecorator],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type StoryType = StoryObj<typeof Task>

export const TaskExample = () => {
  const task = {
    id: v1(),
    title: "DefaultTask",
    status: 0,
    order: 0,
    addedDate: new Date(),
    startDate: null,
    todoListId: "defaultTLiD",
    priority: 1,
    description: "",
    deadline: null,
    taskStatus: "idle" as Status,
  }
  const todolistId = "newTodolistId"

  return <Task task={task} todolistId={todolistId} />
}
