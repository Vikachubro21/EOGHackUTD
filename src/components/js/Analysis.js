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
          <div>
            <Item>
              <div>
                <Typography color="white">Buzz Drilldrin</Typography>
                <Plot
                  data={[
                    {
                      x: [1, 2, 3],
                      y: [2, 6, 3],
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "red" },
                    },
                    { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
                  ]}
                  layout={{
                    width: "90%",
                    height: "500px",
                    title: "A Fancy Plot",
                  }}
                />
              </div>
            </Item>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Typography color="white">Astro Bit</Typography>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Typography color="white">Apollo</Typography>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Typography color="white">ChallengDriller</Typography>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}
export default Analysis;
