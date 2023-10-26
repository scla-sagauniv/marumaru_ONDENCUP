import { Meta, StoryObj } from '@storybook/react'

import { NavBarRight } from './NavBarRight'

const meta = {
  title: 'NavBarRight',
  component: NavBarRight,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {},
} satisfies Meta<typeof NavBarRight>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
