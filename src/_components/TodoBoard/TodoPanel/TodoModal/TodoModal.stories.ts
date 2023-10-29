import { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { TodoModal } from './TodoModal'

const meta = {
  title: 'TodoModal',
  component: TodoModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof TodoModal>

export default meta
type Story = StoryObj<typeof meta>

// TodoOnAppType
// id: z.number(),
// title: z.string(),
// content: z.string().nullable(),
// startTime: z.date().nullable(),
// endTime: z.date().nullable(),
// lavel: z.string().nullable(),
// status: z.nativeEnum(Status),
// userId: z.number(),

// type TodoModalProps = {
//   children: ReactNode,
//   todo: TodoOnAppType
// }

// export function TodoModal({ children, todo }: TodoModalProps) {

export const Default: Story = {
  args: {
    children: React.createElement('h1', null, 'Icon'),
    todo: {
      id: 1,
      title: 'title',
      content: 'content',
      startTime: new Date(),
      endTime: new Date(),
      lavel: 'lavel',
      status: 'DOING',
      userId: 1,
    },
  },
}
