import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
// import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  backgroundColor: 'white', // Set the background color to white
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const currentLocation = 'Hewlett Packard Enterprise,Whitefield Road';
  const currentArea = 'Mahadevapura';
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000); // Update every 1000 milliseconds (1 second)

    return () => clearInterval(interval);
  }, []);
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {/* <Searchbar /> */}

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ textAlign: 'center', marginRight: 2 }}>
          <Typography variant="h4" color="text.primary">
            {currentTime}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', marginRight: 2 }}>
          <Typography variant="h5" color="text.primary">
            {currentLocation}
          </Typography>
          <Typography variant="h6" color="text.primary">
            {currentArea}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1}} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <LanguagePopover /> */}
          {/* <NotificationsPopover /> */}
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
