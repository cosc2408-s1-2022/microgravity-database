import './index.css';
import Login from './pages/Login';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import AddPerson from './pages/AddPerson';
import AddMission from './pages/AddMission';
import AddExperiment from './pages/AddExperiment';
import ViewMission from './pages/ViewMission';
import ViewForCode from './pages/ViewForCode';
import ViewSeoCode from './pages/ViewSeoCode';
import NavBar from './components/NavBar';

// React 18 way of creating a root.
const rootElement = document.getElementById('root') as Element;
const root = ReactDOMClient.createRoot(rootElement);
const queryClient = new QueryClient();
root.render(
  // TODO For testing navigates to register page by default.
  // TODO Page not found.
  // TODO Prevent access to search results.
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <NavBar />
            <Routes>
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/search' element={<BasicSearchPage />} />
              <Route path='/search/advanced' element={<AdvancedSearchPage />} />
              <Route path='/addPerson' element={<AddPerson />} />
              <Route path='/addMission' element={<AddMission />} />
              <Route path='/addExperiment' element={<AddExperiment />} />
              <Route path='/experiment' element={<ViewExperiment />} />
              <Route path='/experiment/:id' element={<ViewExperiment />} />
              <Route path='/mission/:id' element={<ViewMission />} />
              <Route path='/forCode/:id' element={<ViewForCode />} />
              <Route path='/seoCode/:id' element={<ViewSeoCode />} />
            </Routes>
          </LocalizationProvider>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  </QueryClientProvider>,
);

// TODO Might be a good option in production.
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
