import React from 'react';
import './index.css';
import Login from './pages/Login';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import Register from './pages/Register';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './pages/HomePage';
import BasicSearchPage from './pages/BasicSearch';
import ViewExperiment from './pages/ViewExperiment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import AdvancedSearchPage from './pages/AdvancedSearch';

// React 18 way of creating a root.
const rootElement = document.getElementById('root') as Element;
const root = ReactDOMClient.createRoot(rootElement);
const queryClient = new QueryClient();
root.render(
  // TODO For testing navigates to register page by default.
  // TODO Page not found.
  // TODO Prevent access to search results.
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Routes>
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/search' element={<BasicSearchPage />} />
                <Route path='/search/advanced' element={<AdvancedSearchPage />} />
                <Route path='/experiment' element={<ViewExperiment />} />
              </Routes>
            </LocalizationProvider>
          </BrowserRouter>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);

// TODO Might be a good option in production.
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
