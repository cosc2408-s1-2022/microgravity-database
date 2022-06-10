import React from 'react';
import { cleanup } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AddMission from './index';
import { QueryClient, QueryClientProvider } from 'react-query';

afterEach(cleanup);
describe('Rendering page Add Mission page', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const queryClient = new QueryClient();
    ReactDOM.render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AddMission />
        </QueryClientProvider>
      </BrowserRouter>,
      div,
    );
    expect(div).toMatchSnapshot();
  });
});
