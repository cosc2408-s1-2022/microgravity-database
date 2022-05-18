import './index.css';
import Login from './pages/Login';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CssBaseline, Grid, ThemeProvider } from '@mui/material';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import RegisterBasic from './pages/RegisterBasic';
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
import Users from './pages/AdminDashboard/Users';
import Experiments from './pages/AdminDashboard/Experiments';
import AdminDashboard from './pages/AdminDashboard';
import EditExperiment from './pages/EditExperiment';
import Missions from './pages/AdminDashboard/Missions';
import EditMission from './pages/EditMission';
import People from './pages/AdminDashboard/People';
import EditPerson from './pages/EditPerson';
import Register from './pages/Register';

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
            <Grid height='100vh' display='flex' direction='column'>
              <NavBar />
              <Routes>
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/register/basic' element={<RegisterBasic />} />
                <Route path='/search' element={<BasicSearchPage />} />
                <Route path='/search/advanced' element={<AdvancedSearchPage />} />
                <Route path='/addPerson' element={<AddPerson />} />
                <Route path='/addMission' element={<AddMission />} />
                <Route path='/addExperiment' element={<AddExperiment />} />
                <Route path='/experiment/:id' element={<ViewExperiment />} />
                <Route path='/mission/:id' element={<ViewMission />} />
                <Route path='/forCode/:id' element={<ViewForCode />} />
                <Route path='/seoCode/:id' element={<ViewSeoCode />} />
                <Route path='/admin/dashboard' element={<AdminDashboard />}>
                  <Route path='users' element={<Users />} />
                  <Route path='experiments' element={<Experiments />} />
                  <Route path='missions' element={<Missions />} />
                  <Route path='people' element={<People />} />
                </Route>
                <Route path='/admin/experiments/edit' element={<EditExperiment />} />
                <Route path='/admin/missions/edit' element={<EditMission />} />
                <Route path='/admin/people/edit' element={<EditPerson />} />
              </Routes>
            </Grid>
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
