import React from 'react';
import { cleanup } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Missions from './index';

afterEach(cleanup);
describe('Rendering page Admin Dashboard Mission page', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const queryClient = new QueryClient();
    ReactDOM.render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Missions />
        </QueryClientProvider>
      </BrowserRouter>,
      div,
    );
    expect(div).toMatchSnapshot();
  });
});
