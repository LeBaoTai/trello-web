import AppsIcon from '@mui/icons-material/Apps'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SearchIcon from '@mui/icons-material/Search'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import TrelloIcon from '~/assets/trello.svg?react'
import Profile from '~/components/Appbar/Menus/Profile'
import Recent from '~/components/Appbar/Menus/Recent'
import Starred from '~/components/Appbar/Menus/Starred'
import Templates from '~/components/Appbar/Menus/Templates'
import Workspaces from '~/components/Appbar/Menus/WorkSpaces'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box
      sx={{
        height: theme => theme.trello.appBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: 2,
        overflowX: 'auto',
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <AppsIcon sx={{ color: 'white' }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            fontSize="small"
            sx={{
              color: 'white'
            }}
          />
          <Typography
            variant="span"
            sx={{
              fontSize: '1.2rem',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            Trello
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            variant="outlined"
            startIcon={<CreateNewFolderIcon />}
            sx={{
              color: 'white',
              border: 'none',
              '&hover': { border: 'none' }
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}
      >
        <TextField
          id="outlined-seach"
          label="Search..."
          type="text"
          variant="outlined"
          size="small"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <CloseIcon
                  sx={{
                    color: searchValue ? 'white' : 'transparent',
                    cursor: 'pointer'
                  }}
                  fontSize="small"
                  onClick={() => setSearchValue('')}
                />
              )
            }
          }}
          sx={{
            minWidth: 120,
            maxWidth: 180,
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldSet': { borderColor: 'white' },
              '&:hover fieldSet': { borderColor: 'white' },
              '&.Mui-focused fieldSet': { borderColor: 'white' }
            }
          }}
        />
        <ModeSelect />
        <Tooltip title="Notifycation">
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
