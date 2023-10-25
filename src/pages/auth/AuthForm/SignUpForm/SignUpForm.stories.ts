import { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from './SignUpForm'

const meta = {
  title: 'SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
