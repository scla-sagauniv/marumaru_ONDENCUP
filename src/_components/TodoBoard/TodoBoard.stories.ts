import { Meta, StoryObj } from '@storybook/react'

import { TodoBoard } from './TodoBoard'

const meta = {
  title: 'TodoBoard',
  component: TodoBoard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {},
} satisfies Meta<typeof TodoBoard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    todos: [
      {
        id: '1',
        order: 1,
        title: 'title',
        description: 'description',
        status: 'new',
        deadline: '2021-08-01T00:00:00.000Z',
        createdAt: '2021-08-01T00:00:00.000Z',
        updatedAt: '2021-08-01T00:00:00.000Z',
      },
      {
        id: '2',
        order: 1,
        title: 'title',
        description: 'description',
        status: 'new',
        deadline: '2021-08-01T00:00:00.000Z',
        createdAt: '2021-08-01T00:00:00.000Z',
        updatedAt: '2021-08-01T00:00:00.000Z',
      },
      {
        id: '3',
        order: 1,
        title: 'title',
        description: 'description',
        status: 'new',
        deadline: '2021-08-01T00:00:00.000Z',
        createdAt: '2021-08-01T00:00:00.000Z',
        updatedAt: '2021-08-01T00:00:00.000Z',
      },
    ],
  },
}
