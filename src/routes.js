import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import AddDevice from './pages/AddDevice/AddDeviceForm';
import AddTodo from './pages/AddTodo/Addtodo';
import DashboardAppPage from './pages/DashboardAppPage';
import DevicesListTable from './pages/DevicesListTable/DevicesListTable';
import LoginPage from './pages/LoginPage';
import ManagerListTable from './pages/ManagerListTable/ManagerListTable';
import Page404 from './pages/Page404';
import Report from './pages/ReportSensorValue/Report';
import SensorValuePage from './pages/SensorValue/SensorValuePage';
import TodoListtable from './pages/TodoListTable/TodoListtable';
import AddUser from './pages/UserAdd/UserAdd';
import UserListTable from './pages/UserListTable/UserListTable';
import WeightReport from './pages/ReportSensorValue/WeightReport';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
      {
        path: '/',
        element: <LoginPage/>,index: true, // Set LoginPage as the root page
      },
      {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: false },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserListTable /> },
        { path: 'managers', element: <ManagerListTable /> },
        { path: 'devices', element: <DevicesListTable /> },
        { path: 'add-device', element: <AddDevice /> },
        { path: 'add-manager', element: <AddUser /> },
        { path: 'add-user', element: <h1><AddUser/></h1> },
        { path: 'sensor_values', element: <Report/>},
        { path: 'todo', element: <TodoListtable/>},
        { path: 'addtodo', element: <AddTodo/>},
        { path: 'weight-logs', element: <WeightReport/>},
      ],
    },
    {path: 'sensor-value/:device_id', element: <SensorValuePage/>},
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        // { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
