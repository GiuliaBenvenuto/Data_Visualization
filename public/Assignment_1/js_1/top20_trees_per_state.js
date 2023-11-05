// VERTICAL BAR CHART
import { addTitle, createGrid, addTooltip } from "./utils.js";
// set the dimensions and margins of the graph
var margin_h = {top: 30, right: 60, bottom: 110, left: 60},
    width_h = 800 - margin_h.left - margin_h.right,
    height_h = 500 - margin_h.top - margin_h.bottom;

// append the svg object to the body of the page
var svg_h = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width_h + margin_h.left + margin_h.right)
    .attr("height", height_h + margin_h.top + margin_h.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_h.left + "," + margin_h.top + ")");


// load the data
d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vRH4eOpVXSGv8yQFKn3wm5a6yZX8H1uafXM0VjCDKiObj--4cGOnayvqd3aO25kB2DPHZklTK8Gtl2t/pub?gid=1229357561&single=true&output=csv", function(data) {

    // X axis
    var x_h = d3.scaleBand()
      .range([ 0, width_h ])
      .domain(data.map(function(d) { return d.state; }))
      .padding(0.2);

    svg_h.append("g")
      .attr("transform", "translate(0," + height_h + ")")
      .style("font", "17px Fira Sans")
      .call(d3.axisBottom(x_h))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font", "15px Fira Sans");

    // Add Y axis
    var y_h = d3.scaleLinear()
      .domain([0, data[0].value]) 
      .range([ height_h, 0]);
    svg_h.append("g")
      .call(d3.axisLeft(y_h));
    
    // Add Y axis grid lines
    createGrid(svg_h, "yGrid", y_h, width_h, 10, "lightgray", "4");

    var colorScale = d3.scaleLinear();
      colorScale.domain([0, data[0].value])
      colorScale.range(['#bbf7d0', '#15803d'])

  // Define the div for the tooltip (show value in a small div on mouse hover)
     var tooltip = addTooltip(d3.select('body'));

  // Bars
    svg_h.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x_h(d.state); })
        .attr("y", function(d) { return y_h(0); })
        .attr("width", x_h.bandwidth())
        .attr("height", function(d) { return height_h - y_h(0); })
        .attr('fill', function(data, index){
          return colorScale(data.value)
        })
        .on("mouseover", function(d) {
          tooltip.transition()
            .duration(100)
            .style("opacity", 0.9);
          tooltip.html("<strong>Value:</strong> " + d.value)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          tooltip.transition()
            .duration(200)
            .style("opacity", 0);
        });

    // Add title
    addTitle(svg_h, "Top-20 number of trees per state", "20px", "#14532d", width_h / 2, -10);

      // Animation
      svg_h.selectAll("rect")
        .transition()
        .duration(400)
        .attr("y", function(d) { return y_h(d.value); })
        .attr("height", function(d) { return height_h - y_h(d.value); })
        .delay(function(d,i){console.log(i) ; return(i*100)})

})