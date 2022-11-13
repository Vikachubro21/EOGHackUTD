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
import Fastest from "./Fastest";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

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
    prices.push(temp);
    i += margin;
  }
  prices.push(dist * 1.5 + price);
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
    prices.push(temp);
    i += margin;
  }
  prices.push(
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
  const [isComplete, setIsComplete] = useState(false);
  const [JSON, setJSON] = useState({});
  const [isError, setIsError] = useState(false);
  const [isFastest, setIsFastest] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/Vikachubro21/EOGHackUTD/main/CheapestDF.json"
      )
      .then(
        (result) => {
          setIsComplete(true);
          setJSON(result.data);
          console.log(result);
        },
        (error) => {
          setIsComplete(true);
          setIsError(error);
        }
      );
  }, []);

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

  if (isError) {
    return <div>Error: {isError.message}</div>;
  } else if (!isComplete) {
    return <div>Loading...</div>;
  }
  let minPrice = 10000;
  let minBit = "ChallengDriller";
  const input = (
    <Item elevation={24}>
      <form noValidate autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Typography> Enter your information here! </Typography>
          <div className="inputField">
            <TextField
              id="outlined-basic"
              label="Maximum Depth"
              error={isSubmitted || !isNumeric(depthRef)}
              variant="outlined"
              inputRef={depthRef}
            />
          </div>
          <div className="inputField">
            <TextField
              id="outlined-basic"
              label="Differential Pressure"
              error={isSubmitted || !isNumeric(pressureRef)}
              variant="outlined"
              inputRef={pressureRef}
            />
          </div>
          <div className="inputField">
            <TextField
              id="outlined-basic"
              label="Hook Load"
              error={isSubmitted || !isNumeric(hardnessRef)}
              variant="outlined"
              inputRef={hardnessRef}
            />
          </div>
        </Box>
        <Button onClick={sendValue}> Submit </Button>
      </form>
    </Item>
  );
  const plan = isFastest ? (
    <Fastest />
  ) : (
    [
      <Cheapest />,
      <div>
        <Typography>
          The best drill bit in regards for price is {minBit}
        </Typography>
        <Typography>The expected price is ${minPrice}</Typography>
      </div>,
    ]
  );
  const plans = (
    <Item elevation={75}>
      <div>
        <Button
          variant="text"
          size="large"
          className="Button"
          onClick={() => setIsFastest(true)}
        >
          Fastest
        </Button>
        <Button
          variant="text"
          size="large"
          className="Button"
          onClick={() => setIsFastest(false)}
        >
          <Typography>Cheapest</Typography>
        </Button>
      </div>
      {plan}
    </Item>
  );
  if (isSubmitted) {
    // const depth = [];
    // const ApolloRate = [];
    // const AstroRate = [];
    // for (let i = 0; i < 374; i++) {
    //   depth.push(JSON["Bit Depth"][i]);
    //   ApolloRate.push(JSON["ApolloDrill RoP Estimate"][i]);
    //   AstroRate.push(JSON["AstroDrill RoP Estimate"][i]);
    // }
    // const dist = 1000;
    // const samples = 50;
    // const buzzPrice = sampledBuzzPrice(dist, samples)[0];
    // const AstroPrice = sampledHourlyPrice(
    //   depth,
    //   AstroRate,
    //   formValues[0],
    //   50,
    //   1500,
    //   1.5,
    //   3000
    // )[0];
    // const ApolloPrice = sampledHourlyPrice(
    //   depth,
    //   ApolloRate,
    //   formValues[0],
    //   50,
    //   2500,
    //   4,
    //   1000
    // )[0];
    // if (buzzPrice < minPrice) {
    //   minPrice = buzzPrice;
    //   minBit = "BuzzDrilldrin";
    // }
    // if (AstroPrice < minPrice) {
    //   minPrice = AstroPrice;
    //   minBit = "AstroBit";
    // }
    // if (ApolloPrice < minPrice) {
    //   minPrice = ApolloPrice;
    //   minBit = "Apollo";
    // }
    return plans;
  } else {
    return input;
  }
}
export default Plans;
