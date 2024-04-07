import React from "react"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import { StoriesProviderDecorator } from "app/StoriesProviderDecorator"
import { action } from "@storybook/addon-actions"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof AddItemForm> = {
  title: "addItemForm component",
  component: AddItemForm,
  decorators: [StoriesProviderDecorator],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    callBack: {
      description: "Button clicked inside form",
      action: "clicked",
    },
    placeholder: {
      description: "add title",
    },
    style: {
      description: "css styles",
    },
  },
}

export default meta
type Story = StoryObj<typeof AddItemForm>

const callback = action("button ADD was pressed inside the form")

export const AddItemFormStoryObjExample: Story = {
  args: {
    callBack: callback,
    placeholder: "add title",
    style: { backgroundColor: "lightgray", borderRadius: "3px" },
  },
}

export const AddItemFormRenderExample: Story = {
  render: () => <AddItemForm callBack={callback} placeholder="add title" />,
}

export const AddItemFormReturnExample = () => {
  return (
    <AddItemForm
      callBack={callback}
      placeholder="add title"
      style={{ backgroundColor: "lightgray", borderRadius: "3px" }}
    />
  )
}
