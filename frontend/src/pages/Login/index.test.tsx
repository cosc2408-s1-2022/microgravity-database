import React from 'react';
import { cleanup } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from './index';

afterEach(cleanup);
describe('Rendering page Login page', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const queryClient = new QueryClient();
    ReactDOM.render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Login />
        </QueryClientProvider>
      </BrowserRouter>,
      div,
    );
    expect(div).toMatchSnapshot();
  });
});
