import * as React from 'react'
import AdbIcon from '@mui/icons-material/Adb'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

export function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar className="col-[1/3] w-full" position="sticky">
      <Container className="!max-w-none bg-neutral-600 !p-0">
        <Toolbar className="flex w-full items-center justify-between">
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: 'flex',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Payments
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <Tooltip title="Open settings">
              <IconButton
                className="float-right mr-auto"
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
