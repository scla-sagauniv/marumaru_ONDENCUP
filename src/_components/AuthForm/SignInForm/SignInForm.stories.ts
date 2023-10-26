import { Meta, StoryObj } from '@storybook/react'

import SignInForm from './SignInForm'

const meta = {
  title: 'SignInForm',
  component: SignInForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof SignInForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
