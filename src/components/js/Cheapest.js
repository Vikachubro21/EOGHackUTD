
import Plot from "react-plotly.js";

const calculateCheap = () => {
    
}
function Cheapest() {
  return (
    <Plot
        data={[
        {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
        },
        { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{
        width: "90%",
        height: "500px",
        title: "A Fancy Plot",
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
export default Cheapest;
