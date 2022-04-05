import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Header from '../Header';
import { Router } from '@mui/icons-material';

afterEach(cleanup);
describe('Header matches snapshot', () => {
  test('render Header', () => {
    const { container } = render(
      <Router>
        <Header />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
