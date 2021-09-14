import React from 'react';
import { render, screen } from '@testing-library/react';
import Appp from './App';

test('renders learn react link', () => {
  render(<Appp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
