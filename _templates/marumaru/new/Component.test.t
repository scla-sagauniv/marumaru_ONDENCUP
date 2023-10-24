---
to: <%= abs_path %>/<%= component_name %>.test.tsx
---
<% if (have_test) { -%>
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './<%= component_name %>.stories';

const { Default } = composeStories(stories);

describe('What are you testing?', () => {
  test('Default', () => {
    render(<Default />);
    // await Default.play(); // interaction is boosted
    expect(screen.getByRole('something')).toBeInTheDocument();
  });
});
<% } -%>
