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
      id: '1',
      order: 1,
      title: 'title',
      description: 'description',
      status: 'new',
      deadline: '2021-08-01T00:00:00.000Z',
      createdAt: '2021-08-01T00:00:00.000Z',
      updatedAt: '2021-08-01T00:00:00.000Z',
    },
  },
}
