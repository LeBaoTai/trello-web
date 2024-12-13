import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FilterIcon from '@mui/icons-material/Filter'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  px: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        px: 2,
        height: theme => theme.trello.boardBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        borderBottom: '1px solid white'
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
        <Chip
          icon={<DashboardIcon />}
          label="LeBaoTai Mern Stack"
          onClick={() => {}}
          sx={MENU_STYLES}
        />
        <Chip
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          onClick={() => {}}
          sx={MENU_STYLES}
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add to GoogleDrive"
          onClick={() => {}}
          sx={MENU_STYLES}
        />
        <Chip
          icon={<BoltIcon />}
          label="Automation"
          onClick={() => {}}
          sx={MENU_STYLES}
        />
        <Chip
          icon={<FilterIcon />}
          label="Filter"
          onClick={() => {}}
          sx={MENU_STYLES}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{ color: 'white', borderColor: 'white' }}>
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: '8px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 15,
              border:'none'
            }
          }}>
          <Tooltip title="dev">
            <Avatar src="src/assets/10x15.jpg" alt="avt" />
          </Tooltip>
          <Tooltip title="dev">
            <Avatar src="src/assets/10x15.jpg" alt="avt" />
          </Tooltip>
          <Tooltip title="dev">
            <Avatar src="src/assets/10x15.jpg" alt="avt" />
          </Tooltip>
          <Tooltip title="dev">
            <Avatar src="src/assets/10x15.jpg" alt="avt" />
          </Tooltip>
          <Tooltip title="dev">
            <Avatar src="src/assets/10x15.jpg" alt="avt" />
          </Tooltip>
          <Tooltip title="dev">
            <Avatar src="src/assets/10x15.jpg" alt="avt" />
          </Tooltip>
          <Tooltip title="dev">
            <Avatar src="src/assets/10x15.jpg" alt="avt" />
          </Tooltip>
          <Tooltip title="dev">
            <Avatar src="src/assets/10x15.jpg" alt="avt" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
