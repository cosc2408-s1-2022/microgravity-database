import React from 'react';
import { cleanup } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ViewSeoCode from './index';

afterEach(cleanup);
describe('Rendering page View Seo Code page', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const queryClient = new QueryClient();
    ReactDOM.render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ViewSeoCode />
        </QueryClientProvider>
      </BrowserRouter>,
      div,
    );
    expect(div).toMatchSnapshot();
  });
});
