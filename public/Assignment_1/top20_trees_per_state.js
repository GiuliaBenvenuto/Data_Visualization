
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 80, left: 60},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// load the data
d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vRH4eOpVXSGv8yQFKn3wm5a6yZX8H1uafXM0VjCDKiObj--4cGOnayvqd3aO25kB2DPHZklTK8Gtl2t/pub?gid=1229357561&single=true&output=csv", function(data) {

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.state; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, data[0].value])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.state); })
    .attr("y", function(d) { return y(0); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(0); })
    .attr("fill", "#23691a")

 //add title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 20) // Adjust the y-coordinate to position the title
    .attr("text-anchor", "middle")
    .style("font-size", "24px")
    .text("Top-20 Number of trees per state");

  // Animation
  svg.selectAll("rect")
    .transition()
    .duration(700)
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); })
    .delay(function(d,i){console.log(i) ; return(i*100)})

})