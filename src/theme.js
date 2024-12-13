// import { extendTheme } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  },
  colorSchemes: {
    light: true,
    dark: true
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            heigth: '8px',
            display: 'none'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '8px'
          },

          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#16a085'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          textTransform: 'none',
          borderWidth: '1px',
          '&:hover': { borderWidth: '2px' }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: () => {
          return {
            // color: theme.palette.primary.main,
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: () => {
          return {
            // color: theme.palette.primary.main,
            // fontSize: '0.875rem',
            // '.MuiOutlinedInput-notchedOutline': {
            //   borderColor: theme.palette.primary.light
            // },
            // '&:hover': {
            //   '.MuiOutlinedInput-notchedOutline': {
            //     borderColor: theme.palette.primary.main
            //   }
            // },
            '& fieldset': {
              borderWidth: '1px !important'
            },
            '&:hover fieldset': {
              borderWidth: '2px !important'
            },
            '&.Mui-focused fieldset': {
              borderWidth: '2px !important'
            }
          }
        }
      }
    }
  }
})

export default theme
