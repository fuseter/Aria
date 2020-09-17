import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';


const backgroundColor = '#222222'
const NavbarColor = '#101010'
const textColor = '#ffffff'
const primary = "#FF0A6C"

const theme = createMuiTheme({

  
  palette: {
    background: {
      dark: backgroundColor,
      default: colors.common.white,
      paper: NavbarColor
    },
    primary: {
      main:  primary
    },
    secondary: {
      main: "#000000"
    },
    text: {
      primary: textColor,
      secondary: textColor
    }
  },
  shadows,
  typography
});

export default theme;
