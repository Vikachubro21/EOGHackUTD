import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Stack,
  Button,
  Grid,
  Paper
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import logo from "../images/EOG_Resources_logo.svg";
// NOTE TO SELF Make the buttons contain typography

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
}));
const theme = createTheme({
  container: {
    height: "100%", // So that grids 1 & 4 go all the way down
    minHeight: 150, // Give minimum height to a div
    border: "1px solid black",
    fontSize: 30,
    textAlign: "center",
  },
  containerTall: {
    minHeight: 250, // This div has higher minimum height
  },
});

function Analysis() {
   return (
     
       <div>
            <Typography color="white">
        {" "}
        Graphs
      </Typography>
    <Grid container spacing={2}>
  <Grid item xs={6}>
    <Item>xs=6</Item>
  </Grid>
  <Grid item xs={6}>
    <Item>xs=6</Item>
  </Grid>
  <Grid item xs={6}>
    <Item>xs=6</Item>
  </Grid>
  <Grid item xs={6}>
    <Item>xs=6</Item>
  </Grid>
</Grid>
    </div>
   );
}
export default Analysis;
