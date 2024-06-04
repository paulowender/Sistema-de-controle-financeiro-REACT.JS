import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from '../../contexts/auth';
import { tr } from '../../lang';

const UserMenu = (props) => {
  const { user, auth } = useAuth()

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    console.log('Logout')
    setAnchorElUser(null);
  };

  const items = [
    {
      title: 'logout',
      onClick: () => auth.signOut(
        (loggedOut) => {
          if (loggedOut) {
            handleCloseUserMenu()
          }
        }
      )
    }
  ]

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={user?.email}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.email} src={user?.photoURL} />
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
        {items.map(({ title, onClick }) => (
          <MenuItem key={title} onClick={onClick}>
            <Typography textAlign="center">{tr(title)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default UserMenu


// <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Typography variant="subtitle1" color="inherit" noWrap>
//               {user?.email}
//             </Typography>
//             <IconButton color="inherit">
//               {/* <AccountCircle /> */}
//               <Avatar src={user?.photoURL} />
//             </IconButton>
//           </Box>