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

// id: z.number(),
// title: z.string(),
// content: z.string().nullable(),
// startTime: z.date().nullable(),
// endTime: z.date().nullable(),
// lavel: z.string().nullable(),
// status: z.nativeEnum(Status),
// userId: z.number(),

export const Default: Story = {
  args: {
    id: '1',
    label: 'new',
    items: [
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
