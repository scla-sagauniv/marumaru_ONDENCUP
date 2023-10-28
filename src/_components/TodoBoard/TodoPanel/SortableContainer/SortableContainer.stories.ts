import { Meta, StoryObj } from '@storybook/react'

import { SortableContainer } from './SortableContainer'

export type SortableContainerProps = {}

const meta = {
  title: 'SortableContainer',
  component: SortableContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof SortableContainer>

export default meta
type Story = StoryObj<typeof meta>
// export type GetTodoType = {
//   id: string
//   order: number
//   status: Status
//   title: string
//   description: string
//   deadline: string
//   createdAt: string
//   updatedAt: string
// }

export const Default: Story = {
  args: {
    id: '1',
    label: 'new',
    items: [
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
