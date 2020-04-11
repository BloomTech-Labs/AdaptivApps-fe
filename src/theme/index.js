import { createMuiTheme } from '@material-ui/core/styles';

// colors
const primary = '#2962FF';
const secondary = '#FFFFFF';

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

const theme = createMuiTheme({
  
  htmlFontSize: '62.5%',
  // htmlFontSize: 10,
  
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
  },
  typography: {
    htmlFontSize: '10px',
    h1: { fontSize: '3rem', fontWeight: 400 },
    h2: { fontSize: '1.3125rem', fontWeight: 500 },
    h3: { fontSize: '2rem' },
    h4: { fontSize: '2rem' },
    h5: { fontSize: '2rem' },
    h6: { fontSize: '2rem' },
    subtitle1: { fontSize: '1.6rem' },
    subtitle2: { fontSize: '1.6rem' },
    body1: { fontSize: '1.6rem' },
    body2: { fontSize: '1.6rem' },
    button: { fontSize: '1.6rem' },
    caption: { fontSize: '1.6rem' },
    overline: { fontSize: '1.6rem' },
  },
  breakpoints: {
    values: {
      xl,
      lg,
      md,
      sm,
      xs,
    },
  }
})

export default theme;