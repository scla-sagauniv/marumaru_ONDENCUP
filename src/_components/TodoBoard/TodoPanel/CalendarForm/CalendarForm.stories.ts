import { Meta, StoryObj } from '@storybook/react'

import { CalendarForm } from './CalendarForm';

export type CalendarFormProps = {};

const meta = {
  title: 'CalendarForm',
  component: CalendarForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
  },
} satisfies Meta<typeof CalendarForm>;


export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: undefined,
    setDate: () => {},
  },
};