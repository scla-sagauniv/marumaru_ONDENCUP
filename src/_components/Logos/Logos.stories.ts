import { Meta, StoryObj } from '@storybook/react'

import Logos from './Logos'

const meta = {
  title: 'Logos',
  component: Logos,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof Logos>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
