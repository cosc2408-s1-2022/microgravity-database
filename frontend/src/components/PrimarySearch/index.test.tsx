import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Router } from '@mui/icons-material';
import PrimarySearch from '../PrimarySearch';

afterEach(cleanup);
describe('PrimarySearch matches snapshot', () => {
  test('render PrimarySearch', () => {
    const { container } = render(
      <Router>
        <PrimarySearch searchString='' />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
