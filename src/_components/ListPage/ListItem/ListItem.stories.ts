import { Meta, StoryObj } from '@storybook/react'

import { ListItem } from './ListItem'

const meta = {
  title: 'ListItem',
  component: ListItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof ListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
