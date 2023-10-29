import { Meta, StoryObj } from '@storybook/react'

import { TodoPanel } from './TodoModal/TodoPanel'

const meta = {
  title: 'TodoPanel',
  component: TodoPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {},
} satisfies Meta<typeof TodoPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    todos: [
      {
        id: 1,
        title: 'title',
        content: 'content',
        startTime: new Date(),
        endTime: new Date(),
        lavel: 'lavel',
        status: 'DOING',
        userId: 1,
      },
      {
        id: 2,
        title: 'title',
        content: 'content',
        startTime: new Date(),
        endTime: new Date(),
        lavel: 'lavel',
        status: 'DOING',
        userId: 1,
      },
      {
        id: 3,
        title: 'title',
        content: 'content',
        startTime: new Date(),
        endTime: new Date(),
        lavel: 'lavel',
        status: 'DOING',
        userId: 1,
      },
    ],
  },
}
