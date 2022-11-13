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

function CheapGraph() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [JSON, setJSON] = useState({});
  const [isError, setIsError] = useState(false);
  let TimeByBitDepthDF;
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/Vikachubro21/EOGHackUTD/main/TimeByBitDepthDF.json"
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
    const colors = ["red", "blue", "green", "yellow"];
    const drillBitNames = [
      "Buzz Drilldrin",
      "Astrobit",
      "Apollo",
      "ChallengDriller",
    ];
    const datas = [
      {
        x: [],
        y: [],
        type: "scatter",
        mode: "markers",
        name: "Buzz Drilldrin",
        marker: { color: colors[0] },
      },
      {
        x: [],
        y: [],
        type: "scatter",
        mode: "markers",
        name: "Astro Bit",
        marker: { color: colors[1] },
      },
      {
        x: [],
        y: [],
        type: "scatter",
        mode: "markers",
        name: "Apollo",
        marker: { color: colors[2] },
      },
      {
        x: [],
        y: [],
        type: "scatter",
        mode: "markers",
        name: "ChallengDriller",
        marker: { color: colors[3] },
      },
    ];
    for (let i = 0; i < 299169; i++) {
      let foundIndex;
      if (JSON["Drill Bit Name"][i] == "Buzz Drilldrin") {
        foundIndex = 0;
      } else if (JSON["Drill Bit Name"][i] == "AstroBit") {
        foundIndex = 1;
      } else if (JSON["Drill Bit Name"][i] == "Apollo") {
        foundIndex = 2;
      } else {
        foundIndex = 3;
      }
      datas[foundIndex].x.push(JSON["Time"][i]);
      datas[foundIndex].y.push(JSON["Bit Depth"][i]);
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
export default CheapGraph;
