// set the dimensions and margins of the graph
var margin_city = { top: 40, right: 20, bottom: 100, left: 100 },
  width_city = 800 - margin_city.left - margin_city.right,
  height_city = 700 - margin_city.top - margin_city.bottom;

// append the svg object to the body of the page
var svg_city = d3
  .select("#horizontal_barchart")
  .append("svg")
  .attr("width", width_city + margin_city.left + margin_city.right)
  .attr("height", height_city + margin_city.top + margin_city.bottom)
  .append("g")
  .attr("transform", "translate(" + margin_city.left + "," + margin_city.top + ")");

// load the data
d3.csv(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYwM2PtZzr74DXvzNH2rv4cQ33ip3bG5MB0mB7jTT0OV2db0H-PB8gw_zmyGddtOTxHY9ldCVCDcHE/pub?output=csv",
  function (data) {

    // Y axis
    var y_city = d3
      .scaleBand()
      .range([0, height_city])
      .domain(data.map(function (d) {
        return d.city;
      }))
      .padding(0.2);
    svg_city
      .append("g")
      .call(d3.axisLeft(y_city))
      .style("font", "15px Fira Sans");

    // X axis
    var x_city = d3.scaleLinear()
      .domain([0, data[1].Total])
      .range([0, width_city]);

    svg_city.append("g")
        .attr("transform", "translate(0," + height_city + ")")
        .call(d3.axisTop(x_city))
        .selectAll("text")
        .attr("transform", "translate(5,15)rotate(-45)")
        .style("font", "12px Fira Sans")
        .style("text-anchor", "end");

    // Bars
    svg_city
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", function (d) {
        return y_city(d.city);
      })
      .attr("width", function (d) {
        return x_city(d.Total);
      })
      .attr("height", y_city.bandwidth())
      .attr("fill", "#14532d");

    // Add title
    svg_city
      .append("text")
      .attr("x", width_city / 2)
      .attr("y", -20) // Adjust the y-coordinate to position the title
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("fill", "#14532d")
      .text("Top-20 number of trees per city");

    // Animation
    // DA CORREGGERE
    svg_city
      .selectAll("rect")
      .transition()
      .duration(700)
      .attr("x", 0)
      .attr("width", function (d) {
        return x_city(d.Total);
      })
      .delay(function (d, i) {
        return i * 100;
      });
  }
);
