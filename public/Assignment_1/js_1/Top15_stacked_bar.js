// STACKED BAR CHART
import { createGrid, addTitle, addTooltip } from "./utils.js";
// set the dimensions and margins of the graph
var margin_stack = {top: 30, right: 30, bottom: 100, left: 60},
    width_stack = 900 - margin_stack.left - margin_stack.right,
    height_stack = 600 - margin_stack.top - margin_stack.bottom;

// append the svg object to the body of the page
var svg_stack = d3.select("#stacked_barchart")
  .append("svg")
    .attr("width", width_stack + margin_stack.left + margin_stack.right)
    .attr("height", height_stack + margin_stack.top + margin_stack.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_stack.left + "," + margin_stack.top + ")");

// Parse the Data
d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vQWan1dg4-fZLQ-gM9V8AR6cBW1DumszVHmQOu51s4vWOuRdLUoB5TzdX_pgO_Kf_1dlsVoU9waEkO5/pub?output=csv", function(data) {

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var cities = d3.map(data, function(d){return(d.city)}).keys()

  // Add X axis
  var x_stack = d3.scaleBand()
      .domain(cities)
      .range([0, width_stack])
      .padding([0.2])

    
  var maxSum = d3.max(data, function(d) {
    // Calculate the sum of values for columns 1 to 4
    return d3.sum(subgroups.map(function(subgroup) {
      return +d[subgroup];
    }));
  });


  // Add Y axis
  var y_stack = d3.scaleLinear()
    .domain([0, maxSum])
    .range([ height_stack, 0 ]);

    svg_stack
      .append("g")
      .call(d3.axisLeft(y_stack))
      .style("font", "15px Fira Sans");

    svg_stack.append("g")
        .attr("transform", "translate(0," + height_stack + ")")
        .call(d3.axisBottom(x_stack).tickSizeOuter(0))
        .selectAll("text")
        .attr("transform", "translate(-5, 10)rotate(-45)")
        .style("font", "14px Fira Sans")
        .style("text-anchor", "end");

  //Add grid
  createGrid(svg_stack, "yGrid", y_stack, width_stack, 10, "lightgray", "4");

  // color palette = one color per subgroup
  var color_stack = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#86efac','#22c55e','#15803d', '#14532d'])


  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)

  // Define the div for the tooltip (show value in a small div on mouse hover)
  var tooltip = addTooltip(d3.select('body'));

  // Show the bars
  svg_stack.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color_stack(d.key); })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x_stack(d.data.city); })
        .attr("y", function(d) { return y_stack(d[1]); })
        .attr("height", function(d) { return y_stack(d[0]) - y_stack(d[1]); })
        .attr("width",x_stack.bandwidth())
        .on("mouseover", function(d) {
          tooltip.transition()
            .duration(100)
            .style("opacity", 0.9);
          tooltip.html( //show clearly the number of differtent species in a city on mouse hover
          "<span style='color: #14532d;'> <strong>Acer Platanoides: </strong> " + d.data.Acer_Platanoides + "</span><br>" +
          "<span style='color: #15803d;'> <strong>Platanus Acerifolia: </strong> " + d.data.Platanus_Acerifolia + "</span><br>" +
          "<span style='color: #22c55e;'> <strong>Lagerstroemia Indica: </strong> " + d.data.Lagerstroemia_Indica + "</span><br>" +
          "<span style='color: #86efac;'> <strong>Other: </strong> " + d.data.Other + "</span>"
            )
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          tooltip.transition()
            .duration(200)
            .style("opacity", 0);
        })

        // Add title
        addTitle(svg_stack, "Top-15 city's number of trees per category", "20px", "#14532d", (width_stack / 2), 0 - (margin_stack.top / 2));

});