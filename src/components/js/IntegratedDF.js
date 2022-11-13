import Plot from "react-plotly.js";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { values } from "@fluentui/react";
// let depth be an array with the input

function CheapGraph() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [JSON, setJSON] = useState({});
  const [isError, setIsError] = useState(false);
  let TimeByBitDepthDF;
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/Vikachubro21/EOGHackUTD/main/IntegratedDF.json"
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
      "AstroBit",
      "Apollo",
      "ChallengDriller",
    ];
    const datas = [
      {
        x: [],
        y: [],
        type: "scatter",
        mode: "lines",
        name: "Buzz Drilldrin",
        marker: { color: colors[0] },
      },
      {
        x: [],
        y: [],
        type: "scatter",
        mode: "lines",
        name: "AstroBit",
        marker: { color: colors[1] },
      },
      {
        x: [],
        y: [],
        type: "scatter",
        mode: "lines",
        name: "Apollo",
        marker: { color: colors[2] },
      },
      {
        x: [],
        y: [],
        type: "scatter",
        mode: "lines",
        name: "ChallengDriller",
        marker: { color: colors[3] },
      },
    ];
    for (let i = 0; i < 1500; i++) {
      let foundIndex;
      if (JSON["Bit Drill Name"][i] == "Buzz Drilldrin") {
        foundIndex = 0;
      } else if (JSON["Bit Drill Name"][i] == "Astro Drill") {
        foundIndex = 1;
      } else if (JSON["Bit Drill Name"][i] == "Apollo") {
        foundIndex = 2;
      } else {
        foundIndex = 3;
      }
      datas[foundIndex].x.push(JSON["Bit Depth"][i]);
      datas[foundIndex].y.push(JSON["Hours per Foot"][i]);
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
