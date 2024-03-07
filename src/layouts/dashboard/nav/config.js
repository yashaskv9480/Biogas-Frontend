import SvgColor from '../../../components/svg-color';
import useAuth from '../../../sections/auth/login/useAuth';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const NavConfig = () => {
  const { isManager, isUser } = useAuth();

  let config = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    { 
      title: 'Manager',
      path: '/dashboard/managers',
      icon: icon('ic_user'),
    },
    {
      title: 'user',
      path: '/dashboard/user',
      icon: icon('ic_user'),
    },
    {
      title: 'Devices',
      path: '/dashboard/devices',
      icon: icon('ic_lock'),
    },
    {
      title: 'Report',
      path: '/dashboard/sensor_values',
      icon: icon('ic_analytics'),
    },
    {
      title: 'To-do List',
      path: '/dashboard/todo',
      icon: icon('ic_disabled'),
    },
  ];

  if (isManager) { 
    config = config.filter((item) => item.title !== 'Manager'); }
     else if (isUser) 
     { config = config.filter((item) => item.title !== 'Manager' && item.title !== 'user'); }

  return config;
};

export default NavConfig;
