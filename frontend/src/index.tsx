import React from 'react';
import './index.css';
import Login from './pages/Login';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import Register from './pages/Register';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from 'react-query';

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
                <Route path='login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/home' element={<Home />} />
                // TODO page not found
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
