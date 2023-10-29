import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'
import { TrpcProvider } from '../src/utils/storybook/provider'
import ReduxProvider from '../src/lib/state/provider/index'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <TrpcProvider>
        <ReduxProvider>
          <Story />
        </ReduxProvider>
      </TrpcProvider>
    ),
  ],
}

export default preview
