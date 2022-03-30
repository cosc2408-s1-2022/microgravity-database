import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Register from './pages/Register';
import Home from './pages/Home';

// React 18 way of creating a root.
const rootElement = document.getElementById('root') as Element;
const root = ReactDOMClient.createRoot(rootElement);
const queryClient = new QueryClient();
root.render(
  // TODO For testing navigates to register page by default.
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Navigate to='/register' />} />
                <Route path='/register' element={<Register />} />
                <Route path='/home' element={<Home />} />
              </Routes>
            </BrowserRouter>
          </CssBaseline>
        </ThemeProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);

// TODO Might be a good option in production.
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
