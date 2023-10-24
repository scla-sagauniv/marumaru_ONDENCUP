import { Meta, StoryObj } from '@storybook/react'

import { DndCmp } from '.'

const meta = {
  title: 'DndCmp',
  component: DndCmp,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof DndCmp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
