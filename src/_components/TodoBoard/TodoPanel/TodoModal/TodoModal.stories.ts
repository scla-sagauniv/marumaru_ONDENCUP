import { Meta, StoryObj } from '@storybook/react'

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

export const Default: Story = {
  args: {
    children: 'TodoModal',
  },
}
