import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Stack,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import logo from "../images/newplot_13.png";
import Plot from "react-plotly.js";
import Cheapest from "./Cheapest";
import IntegratedDF from "./IntegratedDF";
import InvertedDepthByRoP from "./InvertedDepthbyROP";
import DepthVRoPSmoothed from "./DepthVRoPSmoothed";
// NOTE TO SELF Make the buttons contain typography

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
  minHeight: "700px",
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
      <Typography color="white">Drill Info</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <Typography color="white">Buzz Drilldrin</Typography>
            <IntegratedDF />
            {/* <Typography color="white">Temp Text</Typography> */}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Typography color="white">ChallengDriller</Typography>
            <InvertedDepthByRoP />
            {/* <Typography color="white">Temp Text</Typography> */}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Typography color="white">Buzz Drilldrin</Typography>
            <DepthVRoPSmoothed />
            {/* <Typography color="white">Temp Text</Typography> */}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Typography color="white">ChallengDriller</Typography>
            <InvertedDepthByRoP />
            {/* <Typography color="white">Temp Text</Typography> */}
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}
export default Analysis;
