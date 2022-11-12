import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Input from "./Input";
import { useState, useRef } from "react";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
}));

function Plans() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formValues, setFormValues] = useState([]);
  const depthRef = useRef();
  const pressureRef = useRef();
  const hardnessRef = useRef();
  var allRefs = [depthRef, pressureRef, hardnessRef];

  const sendValue = () => {
    allRefs = [depthRef, pressureRef, hardnessRef];
    const refVals = allRefs.map((ref) => ref.current.value);
    setFormValues(refVals);
    console.log(formValues);
  };
  const sendValueFR = () => {
    sendValue();
    sendValue();
  };
  const input = (
    <Item elevation={69}>
      <form noValidate autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Typography> Enter your information here! </Typography>
          <div className="inputField">
            <TextField
              id="outlined-basic"
              label="Depth"
              variant="outlined"
              inputRef={(depthRef) =>
                typeof depthRef !== "undefined"
                  ? (this.depthRef = depthRef)
                  : null
              }
            />
          </div>
          <div className="inputField">
            <TextField
              id="outlined-basic"
              label="Pressure"
              variant="outlined"
              inputRef={(pressureRef) =>
                typeof pressureRef !== "undefined"
                  ? (this.pressureRef = pressureRef)
                  : null
              }
            />
          </div>
          <div className="inputField">
            <TextField
              id="outlined-basic"
              label="Hardness"
              variant="outlined"
              inputRef={(hardnessRef) =>
                typeof hardnessRef !== "undefined"
                  ? (this.hardnessRef = hardnessRef)
                  : null
              }
            />
          </div>
        </Box>
        <Button onClick={sendValueFR}> Submit </Button>
      </form>
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
