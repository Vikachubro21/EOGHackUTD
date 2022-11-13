import Plot from "react-plotly.js";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { values } from "@fluentui/react";
// let depth be an array with the input
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

function Cheapest() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [JSON, setJSON] = useState({});
  const [isError, setIsError] = useState(false);
  let TimeByBitDepthDF;
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/Vikachubro21/EOGHackUTD/main/DepthByRoP.json"
      )
      .then(
        (result) => {
          setIsSubmitted(true);
          setJSON(result.data);
          console.log(result);
        },
        (error) => {
          setIsSubmitted(true);
          setIsError(error);
        }
      );
  }, []);
  if (isError) {
    return <div>Error: {isError.message}</div>;
  } else if (!isSubmitted) {
    return <div>Loading...</div>;
  } else {
    const datas = [];
    const x = [];
    const y = [];
    const colors = ["red", "blue", "green", "yellow"];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 375; j++) {
        x.push(JSON["Bit Depth"][375 * i + j]);
        y.push(JSON["RoP Estimate"][375 * i + j]);
      }
      datas.push({
        x: x.map((value) => value),
        y: y.map((value) => value),
        type: "scatter",
        mode: "markers",
        name: JSON["Bit Drill Name"][375 * i],
        marker: { color: colors[i] },
      });
      x.length = 0;
      y.length = 0;
    }
    console.log(datas);
    return (
      <Plot
        data={datas}
        layout={{
          width: "90%",
          height: "500px",
          title: "Depth By RoP",
          paper_bgcolor: "#2B2B2B",
          plot_bgcolor: "#2B2B2B",
          font: {
            color: "#f5f2f2",
          },
          newshape: {
            line: {
              color: "#FFFFFF",
            },
          },
        }}
      />
    );
  }
}
export default Cheapest;
