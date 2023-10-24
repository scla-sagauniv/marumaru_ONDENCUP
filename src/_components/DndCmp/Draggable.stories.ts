import { Meta, StoryObj } from '@storybook/react'

import { Draggable } from './Draggable'

const meta = {
  title: 'Draggable',
  component: Draggable,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof Draggable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Draggable',
  },
}
