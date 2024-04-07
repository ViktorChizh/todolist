import { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"
import { useState } from "react"
import React from "react"
import { StoriesProviderDecorator } from "app/StoriesProviderDecorator"

const meta: Meta<typeof EditableSpan> = {
  title: "EditableSpan",
  component: EditableSpan,
  decorators: [StoriesProviderDecorator],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof EditableSpan>
export const EditableSpanStory: Story = {
  args: {
    oldTitle: "oldTitle",
    callBack: action("Value EditableSpan changed"),
  },
}

export const EditableSpanStoryReturn = () => {
  const [newTitle, setNewTitle] = useState("oldTitle")
  return <EditableSpan oldTitle={newTitle} callBack={setNewTitle} />
}
