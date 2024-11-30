import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { text, settingsMenu } from '../constant/textConstants';
import { getFirstLetterUppercase } from '../utils';
import { LOGOUT_API, WITH_CREDENTIALS } from '../constant/apiUrls';

const Header = ({ userId }) => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  

  const handleOpenUserMenu = (ev) => {
    setAnchorElUser(ev.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async (setting) => {
    if (setting === 'Logout') {
      await axios.post(LOGOUT_API, {}, WITH_CREDENTIALS);
      setAnchorElUser(null);
      navigate('/');
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {text.dashboard}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { lg: 'flex', md: 'flex' } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={getFirstLetterUppercase(userId)} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settingsMenu?.map((setting) => (
                <MenuItem key={setting} onClick={() => handleLogout(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
