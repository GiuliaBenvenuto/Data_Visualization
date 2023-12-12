// console.log("Assignment_4/js_4/dot_density_map.js loaded");
// https://observablehq.com/@vizbiz/map

let drawChart = function() {
    const radius = {
      scale: d3.scaleSqrt()
        .domain([0, 2e7])
        .range([0, 35]),
      scaleData:  [2e6, 1e7, 2e7],
      metric: "dep_delay"
    };
    
    const fill = {
      scale: d3.scaleSequential(d3.interpolateRdYlBu)
        .domain([0, 20]),
      metric: "dep_delay"
    };
    
    const chart = new Chart(data, radius, fill);
    return chart.div;
}

class Chart {
    constructor(dataMap, radius, fill = {}) {
      const data = Array.from(dataMap).map((d) => d[1]);
      const interval = 500;
      const width = 960;
      const height = 600;
      const path = d3.geoPath();
      const projection = d3.geoAlbersUsa().scale(1280).translate([width / 2, height / 2]);
      
      this.radius = radius;
      this.fill = fill;
      
      //this.radiusTransition = d3.transition().duration(interval);
      
      const svg = d3.select(DOM.svg(width, height))
        .style("width", "100%")
        .style("font-family", "sans-serif")
        .style("height", "auto");
     
      svg.append("path")
          .datum(topojson.feature(us, us.objects.nation))
          .attr("fill", "#ccc")
          .attr("d", path);
  
      svg.append("path")
          .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
          .attr("fill", "none")
          .attr("stroke", "white")
          .attr("stroke-linejoin", "round")
          .attr("d", path);
      
      this.circles = svg.append("g")
        .attr("stroke", "#fff")
        .attr("opacity", () => (this.fill.scale !== undefined) ? 1 : 0.5)
        .attr("stroke-width", 0.5)
        .selectAll("circle")
          .data(data).enter()
        .append("circle")
          .attr("transform", d => `translate(${projection(d.geometry.coordinates)})`)
          .attr("r", 5);
      
      this.div = DOM.element("div");
      const input = this.drawInput(1, 12);
      this.div.appendChild(svg.node());
      this.div.appendChild(input);
    }
    
    drawInput(min, max) {
      const div = html`
        <input type=range min=${min} max=${max} value=${min} step=1>
        <input type=number min=${min} max=${max} value=${min} style="width:50px">
      `;      
      const range = div.querySelector("[type=range]");
      const number = div.querySelector("[type=number]");
      div.value = range.value = number.value = min;
      
      const update = _.debounce(() => { this.update(div.value); }, 300);
      
      range.addEventListener("input", () => {
        number.value = div.value = range.valueAsNumber;
        update();
      });
      number.addEventListener("input", () => {
        range.value = div.value = number.valueAsNumber;
        update();
      });
      
       return div;
      
    }
}

d3.csv("https://gist.githubusercontent.com/vizbiz/" +
       "0a651bbe43013b80c03dbd1c13f49a8b/raw/303fd2dbfc63761e6614e89dd6b0d7b382e68cad/" +
       "latlongmeans.csv", (error, dataArray) => {
  if (error) throw error;

  // Convert the array to a Map
  const dataMap = new Map(dataArray.map(d => [d.Origin.toLowerCase(), {
    "type": "Feature",
    "properties": {
      "month": d.Month,
      "origin": d.Origin,
      "origin_name": d.OriginName,
      "dep_delay": +d.DepDelay
    },
    "geometry": {
      "type": "Point",
      "coordinates": [d.Longitude, d.Latitude]
    }
  }]));

  // Now you can use dataMap
  // For example, logging the map
  console.log(dataMap);

  // Rest of your code that uses dataMap
});




