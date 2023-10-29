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
