import { Meta, StoryObj } from '@storybook/react'

import { Droppable } from './Droppable'

const meta = {
  title: 'Droppable',
  component: Droppable,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof Droppable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Droppable',
  },
}
