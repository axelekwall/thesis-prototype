import { createMuiTheme } from '@material-ui/core/styles';
import { grey, green } from '@material-ui/core/colors';

export const drawerWidth = 300;

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: grey['800'],
    },
    secondary: {
      main: green['300'],
    },
  },
});
