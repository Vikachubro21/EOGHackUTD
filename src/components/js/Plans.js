

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
import Cheapest from "./Cheapest";
import CheapGraph from "./CheapGraph";
import { useState, useRef } from "react";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
}));

const calculateTime = (depth, rate, dist) => {
  const finalRate = rate[rate.length - 1];
  var currDepth = 0;
  var atDepth = false;

  var totalTime = 0;

  if (dist < depth[0]) {
    return dist / rate[0];
  }
  for (let i = 0; i < depth.length; i++) {
    if (atDepth) {
      totalTime -= depth[i - 1] / rate[i - 1];
      currDepth -= depth[i - 1];
      totalTime += (dist - currDepth) / rate[i - 1];
      return totalTime;
    }
    totalTime += depth[i] / rate[i];
    currDepth += depth[i];
    if (currDepth >= dist) {
      atDepth = true;
    }
  }
  totalTime += (dist - currDepth) / finalRate;
  return totalTime;
};
const sampledBuzzPrice = (dist, sampleSize) => {
  let margin = dist; //sampleSize
  let i = 0;
  let prices = [];
  let price = 5000;
  while (i <= dist) {
    let temp = i * 1.5 + price;
    prices.append(temp);
    i += margin;
  }
  prices.append(dist * 1.5 + price);
  return prices;
};

const sampledHourlyPrice = (
  depth,
  rate,
  dist,
  sampleSize,
  hourlyRate,
  distRate,
  price
) => {
  let margin = dist; //sampleSize
  let i = 0;
  let prices = [];
  while (i <= dist) {
    let temp =
      calculateTime(depth, rate, i) * hourlyRate + i * distRate + price;
    prices.append(temp);
    i += margin;
  }
  prices.append(
    dist * distRate + price + calculateTime(depth, rate, dist) * hourlyRate
  );
  return prices;
};



function Plans() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formValues, setFormValues] = useState([]);
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

  const plans = (
    <Item elevation={75}>
      <div>
        <Button variant="text" size="large" className="Button">
          Fastest
        </Button>
        <Button variant="text" size="large" className="Button">
          <Typography>Cheapest</Typography>
        </Button>
      </div>
      <Cheapest />
      <CheapGraph />
    </Item>
  );

  if (isSubmitted) {
    const dist = 1000;
    const samples = 50;
    const buzzPrice = sampledBuzzPrice(dist, samples)[0];
    const AstroPrice = sampledHourlyPrice(, , formValues[0], 50, 1500, 1.5, 3000)
    const ApolloPrice = sampledHourlyPrice( , , formValues[0], 50, 2500, 4, 1000)
    let minPrice = 10000
    let minBit = "ChallengDriller";
    if(buzzPrice < minPrice)
    {
      minPrice = buzzPrice;
      minBit = "BuzzDrilldrin";
    }
    if(AstroPrice < minPrice)
    {
      minPrice = AstroPrice;
      minBit = "AstroBit";
    }
    if(ApolloPrice < minPrice)
    {
      minPrice = ApolloPrice;
      minBit = "Apollo";
    }
    return [plans, 
    <div>
        <Typography>The best drill bit in regards for price is {minBit}</Typography>
        <Typography>The expected price is ${minPrice}</Typography>
         </div>];
  } else {
    return input;
  }
}
export default Plans;
