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
  var allCorrect = [true, true, true];
  async function pythonExec(pythonCode) {
    let pyodide = await window.loadPyodide();
    pyodide.runPython(pythonCode);
  }
  function isNumeric(str) {
    if (typeof str !== "object") return false; // we only process strings!
    if (typeof str.current !== "object") return true;
    //if (typeof str.current.values === "undefined") return false;
    return (
      !isNaN(str.current.value) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str.current.value))
    ); // ...and ensure strings of whitespace fail
  }
  const sendValue = () => {
    allRefs = [depthRef, pressureRef, hardnessRef];
    allCorrect = allRefs.map((value) => isNumeric(value));
    console.log(allCorrect);
    const refVals = allRefs.map((ref) => ref.current.value);
    setFormValues(refVals);
    var isSubbed = true;
    allCorrect.forEach((a) => (isSubbed = isSubbed && a));
    setIsSubmitted(isSubbed);
  };

  const input = (
    <Item elevation={24}>
      <form noValidate autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Typography> Enter your information here! </Typography>
          <div className="inputField">
            <TextField
              id="outlined-basic"
              label="Depth"
              error={!isNumeric(depthRef)}
              variant="outlined"
              inputRef={depthRef}
            />
          </div>
          <div className="inputField">
            <TextField
              id="outlined-basic"
              label="Pressure"
              error={!isNumeric(pressureRef)}
              variant="outlined"
              inputRef={pressureRef}
            />
          </div>
          <div className="inputField">
            <TextField
              id="outlined-basic"
              label="Hardness"
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

  const plans = (
    <Item elevation={75}>
      <Button variant="text" size="large" className="Button">
        Fastest
      </Button>
      <Button variant="text" size="large" className="Button">
        <Typography onClick={pythonExec('print("Hello world!")')}>
          Cheapest
        </Typography>
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
