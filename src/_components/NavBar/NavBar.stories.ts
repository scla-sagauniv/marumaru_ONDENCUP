import { Meta, StoryObj } from '@storybook/react'

import { NavBar } from './NavBar'

const meta = {
  title: 'NavBar',
  component: NavBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {},
} satisfies Meta<typeof NavBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
