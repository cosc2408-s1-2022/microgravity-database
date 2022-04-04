import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Router } from '@mui/icons-material';
import PrimarySearch from '../PrimarySearch';

afterEach(cleanup);
describe('PrimarySearch matches snapshot', () => {
  test('render PrimarySearch', () => {
    const { container } = render(
      <Router>
        <PrimarySearch className='justify-content-center d-flex' />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
