import { Meta, StoryObj } from '@storybook/react'

import { TodoItem } from './TodoItem'

const meta = {
  title: 'TodoItem',
  component: TodoItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {},
} satisfies Meta<typeof TodoItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    todo: {
      id: 1,
      title: 'title',
      content: 'content',
      startTime: new Date(),
      endTime: new Date(),
      label: 'label',
      status: 'DOING',
      order: 1,
      userId: 1,
    },
  },
}
