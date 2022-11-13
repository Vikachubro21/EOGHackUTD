
import Plot from "react-plotly.js";
// let depth be an array with the input
const calculateTime = (depth, rate, dist) => {
    const finalRate = rate[rate.length-1]
    var currDepth = 0
    var atDepth = false
    
    var totalTime = 0
    
    if(dist < depth[0]){
        return dist/rate[0]
    }
    for(let i = 0; i < depth.length; i++){
        if(atDepth){
            totalTime -= depth[i-1]/rate[i-1]
            currDepth -= depth[i-1]
            totalTime += (dist-currDepth)/rate[i-1]
            return totalTime
        }
        totalTime += depth[i]/rate[i]
        currDepth += depth[i]
        if(currDepth >= dist){
            atDepth = true
        }
    }
    totalTime += (dist-currDepth)/finalRate
    return totalTime
}
const sampledBuzzPrice = (dist, sampleSize) => {
    
    let margin = dist//sampleSize
    let i = 0
    let prices = []
    let price = 5000
    while(i <= dist){
        let temp = i*1.5 + price
        prices.append(temp)
        i += margin
    }
    prices.append(dist*1.5 + price)
    return prices
}

const sampledHourlyPrice = (depth, rate, dist, sampleSize, hourlyRate, distRate, price) => {
    
    let margin = dist//sampleSize
    let i = 0
    let prices = []
    while(i <= dist){
        let temp = calculateTime(depth, rate, i)*hourlyRate + i*distRate + price
        prices.append(temp)
        i += margin
    }
    prices.append(dist*distRate + price + calculateTime(depth, rate, dist)*hourlyRate)
    return prices
}

function Cheapest({depth}, {pressure}, {load}) {
  return (
    [<Plot
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
    ]
  );
}
export default Cheapest;
