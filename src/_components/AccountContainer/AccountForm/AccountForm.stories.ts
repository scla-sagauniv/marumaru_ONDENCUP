import { Meta, StoryObj } from '@storybook/react'

import { AccountForm } from './AccountForm'

const meta = {
  title: 'AccountForm',
  component: AccountForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof AccountForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    userId: '1',
    name: 'test',
    avatarUrl: 'dummy.png',
  },
}
