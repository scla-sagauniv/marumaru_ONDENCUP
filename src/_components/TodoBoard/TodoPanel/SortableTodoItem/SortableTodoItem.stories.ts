import { Meta, StoryObj } from '@storybook/react'

import { SortableTodoItem } from './SortableTodoItem'

export type SortableTodoItemProps = {}

const meta = {
  title: 'SortableTodoItem',
  component: SortableTodoItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof SortableTodoItem>

// <SortableTodoItem id={todo.id} key={todo.id}>
// <TodoItem todo={todo} />
// </SortableTodoItem>

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
