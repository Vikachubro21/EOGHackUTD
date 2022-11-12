import { AppBar, Box, Toolbar, Typography, Button, Paper } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Input from "./Input";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
}));

function Plans() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [depth, setDepth] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [bullshit, setBullshit] = useState(null);

  const input = (
    <Item elevation={69}>
      <Input />
    </Item>
  );

  const plans = (
    <Item elevation={75}>
      <Button variant="text" size="large" className="Button">
        Fastest
      </Button>
      <Button variant="text" size="large" className="Button">
        <Typography>Cheapest</Typography>
      </Button>
    </Item>
  );

  if (isSubmitted) {
    return plans;
  } else {
    return input;
  }
}
export default Plans;
