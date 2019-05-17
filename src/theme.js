import { darkBlack, orange800 } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary1Color: darkBlack,
    secondary: {
      light: orange800,
      main: '#F47920',
      dark: orange800,
    },
  },
  bottomNavigation: {
    selectedFontSize: 14,
    unselectedFontSize: 14,
  },
  menuLevel1Text: {
    '& :first-child': {
      fontSize: '15px',
      fontWeight: 500,
    },
  },
  menuLevel2Text: {
    '& :first-child': {
      fontSize: '15px',
      fontWeight: 400,
      textIndent: '15px',
    },
  },
  menuHeading: {
    fontSize: '16px',
    fontWeight: 100,
    lineHeight: '52px',
    backgroundColor: '#bbbbbb',
  },
});
