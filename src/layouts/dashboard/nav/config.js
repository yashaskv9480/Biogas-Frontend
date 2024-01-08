// navConfig.js
import SvgColor from '../../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = (type) => {
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
     // {
    //   title: 'Sensor values',
    //   path: '/dashboard/sensor-values',
    //   icon: icon('ic_analytics'),
    // },
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

  if (type === 'manager') {
    config = config.filter((item) => item.title !== 'Manager');
  } else if (type === 'user') {
    config = config.filter((item) => item.title !== 'Manager' && item.title !== 'user');
  }

  return config;
};

export default navConfig;
