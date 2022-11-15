import Plot from "react-plotly.js";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { values } from "@fluentui/react";
// let depth be an array with the input

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
