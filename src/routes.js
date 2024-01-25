import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
// layouts
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import DashboardLayout from './layouts/dashboard';
//
import AddDevice from './pages/AddDevice/AddDeviceForm';
import AddTodo from './pages/AddTodo/Addtodo';
import DashboardAppPage from './pages/DashboardAppPage';
import DevicesListTable from './pages/DevicesListTable/DevicesListTable';
import LoginPage from './pages/LoginPage';
import ManagerListTable from './pages/ManagerListTable/ManagerListTable';
import Report from './pages/ReportSensorValue/Report';
import WeightReport from './pages/ReportSensorValue/WeightReport';
import SensorValuePage from './pages/SensorValue/SensorValuePage';
import TodoListtable from './pages/TodoListTable/TodoListtable';
import AddUser from './pages/UserAdd/UserAdd';
import UserListTable from './pages/UserListTable/UserListTable';

// ----------------------------------------------------------------------

export default function Router() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token')
    if(!token){
      navigate('/login',{replace:true})
    }
},[navigate]);

  const routes = useRoutes([
      {
        path: '/',
        element: <LoginPage/>,index: true, 
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
      path: '*',
      element: <Navigate to="/404" replace />,
    }

  ]);

  return routes;
}
