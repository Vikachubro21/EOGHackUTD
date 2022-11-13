import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import Analysis from "./Analysis";
import Cheapest from "./Cheapest";
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
  const [formValues, setFormValues] = useState(["a", "b", "c"]);
  const depthRef = useRef();
  const pressureRef = useRef();
  const hardnessRef = useRef();
  var allRefs = [depthRef, pressureRef, hardnessRef];
  var allCorrect = [true, true, true];
  let pyodide;
  function isNumeric(str) {
    if (typeof str !== "object") return false; // we only process strings!
    if (typeof str.current !== "object") return true;
    //if (typeof str.current.values === "undefined") return false;
    return (
      !isNaN(str.current.value) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str.current.value))
    ); // ...and ensure strings of whitespace fail
  }
  const sendValue = async () => {
    allRefs = [depthRef, pressureRef, hardnessRef];
    allCorrect = allRefs.map((value) => isNumeric(value));
    console.log(allCorrect);
    const refVals = allRefs.map((ref) => ref.current.value);
    await setFormValues(refVals);
    var isSubbed = true;
    allCorrect.forEach((a) => (isSubbed = isSubbed && a));
    await setIsSubmitted(isSubbed);
    return true;
  };

  const input = (
    <Item elevation={24}>
      <form noValidate autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Typography> Enter your information here! </Typography>
          <div className="inputField">
            <TextField
              id="outlined-basic"
              label="Maximum Depth"
              error={!isNumeric(depthRef)}
              variant="outlined"
              inputRef={depthRef}
            />
          </div>
          <div className="inputField">
            <TextField
              id="outlined-basic"
              label="Differential Pressure"
              error={!isNumeric(pressureRef)}
              variant="outlined"
              inputRef={pressureRef}
            />
          </div>
          <div className="inputField">
            <TextField
              id="outlined-basic"
              label="Hook Load"
              error={!isNumeric(hardnessRef)}
              variant="outlined"
              inputRef={hardnessRef}
            />
          </div>
        </Box>
        <Button onClick={sendValue}> Submit </Button>
      </form>
    </Item>
  );
  const [isShown, setIsShown] = useState(true);
  console.log(formValues);
  const page = isShown ? (
    <Analysis />
  ) : (
    <Cheapest
      depth={formValues[0]}
      pressure={formValues[1]}
      load={formValues[2]}
    />
  );
  const plans = (
    <Item elevation={75}>
      <Button
        variant="text"
        size="large"
        className="Button"
        onClick={() => setIsShown(false)}
      >
        Cheapest
      </Button>
      <Button
        variant="text"
        size="large"
        className="Button"
        onClick={() => setIsShown(true)}
      >
        <Typography>Fastest</Typography>
      </Button>
      {page}
    </Item>
  );

  if (isSubmitted) {
    return plans;
  } else {
    return input;
  }
}
export default Plans;
