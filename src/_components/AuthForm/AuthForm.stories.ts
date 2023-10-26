import { Meta, StoryObj } from '@storybook/react'

import AuthForm from './AuthForm'

const meta = {
  title: 'AuthForm',
  component: AuthForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof AuthForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
