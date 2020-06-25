import { createMuiTheme } from "@material-ui/core/styles";

// colors
const primary = "#2962FF";
const secondary = "#FFFFFF";

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

const theme = createMuiTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
  },
 
  typography: {
    // fontSize: 10,
    h1: { fontSize: "3rem", fontWeight: 400 },
    h2: { fontSize: "2.1rem", fontWeight: 500 },
    h3: { fontSize: "1.8rem", fontWeight: 500 },
    h4: { fontSize: "1.6rem", fontWeight: 500 },
    h5: { fontSize: "1.4rem", fontWeight: 500 },
    h6: { fontSize: "2rem" },
    subtitle1: { fontSize: "1.6rem", color: "#808080" },
    subtitle2: { fontSize: "4.8rem", fontWeight: "bold" },
    body1: { fontSize: "1.6rem" },
    body2: { fontSize: "1.6rem" },
    button: { fontSize: "1.6rem" },
    caption: { fontSize: "1.6rem" },
    overline: { fontSize: "1.6rem" },
  },
  breakpoints: {
    values: {
      xl,
      lg,
      md,
      sm,
      xs,
    },
  },
});

export default theme;
