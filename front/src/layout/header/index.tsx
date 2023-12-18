import { getUser } from '@/utils/getUser'
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'

export function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { user } = getUser()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
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
                <Avatar {...stringAvatar(user?.name)} />
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
              <hgroup className="flex flex-col gap-2 px-2 py-4">
                <h2 className="text-xl">{user?.name}</h2>
                <h4 className="text-slate-500">{user?.username}</h4>
              </hgroup>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

function stringAvatar(name?: string) {
  if (!name) return

  return {
    children: `${name.split(' ')[0][0]}`,
  }
}
