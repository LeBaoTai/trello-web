import AppsIcon from '@mui/icons-material/Apps'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import TrelloIcon from '~/assets/trello.svg?react'
import Recent from '~/components/Appbar/Menus/Recent'
import Starred from '~/components/Appbar/Menus/Starred'
import Templates from '~/components/Appbar/Menus/Templates'
import Workspaces from '~/components/Appbar/Menus/WorkSpaces'
import ModeSelect from '~/components/ModeSelect'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from '~/components/Appbar/Menus/Profile'

function AppBar() {
  return (
    <Box
      px={2}
      sx={{
        height: theme => theme.trello.appBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
        <AppsIcon sx={{ color: 'primary.main' }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            sx={{
              color: 'primary.main'
            }}
          />
          <Typography
            variant="span"
            sx={{
              fontSize: '1.2rem',
              color: 'primary.main',
              fontWeight: 'bold'
            }}>
            Trello
          </Typography>
        </Box>
        <Workspaces />
        <Recent />
        <Starred />
        <Templates />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}>
        <TextField
          id="outlined-seach"
          label="Search..."
          variant="outlined"
          size="small"
        />
        <ModeSelect />
        <Tooltip title="Notifycation">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer' }} />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
