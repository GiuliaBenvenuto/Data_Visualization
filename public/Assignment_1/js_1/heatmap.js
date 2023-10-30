
// HEATMAP
// https://docs.google.com/spreadsheets/d/e/2PACX-1vR9sVhFoMblAAKjiTYvx4z2CMadwPYrFnI3Hb9ZO7FdFm87DJ1RbLrJQUv770VGj2HuCdIHNoze3p4B/pub?output=csv

// set the dimensions and margins of the graph
var margin_heatmap = {top: 30, right: 30, bottom: 100, left: 30},
  width_heatmap = 650 - margin_heatmap.left - margin_heatmap.right,
  height_heatmap  = 450 - margin_heatmap.top - margin_heatmap.bottom;

// append the svg object to the body of the page
var svg_heatmap = d3.select("#my_heatmap")
.append("svg")
  .attr("width", width_heatmap  + margin_heatmap .left + margin_heatmap .right)
  .attr("height", height_heatmap  + margin_heatmap .top + margin_heatmap .bottom)
.append("g")
  .attr("transform",
        "translate(" + margin_heatmap.left + "," + margin_heatmap.top + ")");

// Read the data
d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vR9sVhFoMblAAKjiTYvx4z2CMadwPYrFnI3Hb9ZO7FdFm87DJ1RbLrJQUv770VGj2HuCdIHNoze3p4B/pub?output=csv", function(data) {

  // Labels of row and columns
  // Cities
  var cities = d3.map(data, function(d){return(d.city)}).keys()
  console.log(cities)

  // List of subgroups = header of the csv files = soil condition here
  var tree_types = d3.map(data, function(d){return(d.scientific_name)}).keys()
  console.log(tree_types)
  // var myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

  // Build X scales and axis:
  var x_heatmap = d3.scaleBand()
    .range([ 0, width_heatmap ])
    .domain(cities)
    .padding(0.01);
    svg_heatmap.append("g")
    .attr("transform", "translate(0," + height_heatmap + ")")
    .call(d3.axisBottom(x_heatmap))
    .selectAll("text")
    .attr("transform", "translate(-5, 10)rotate(-45)")
    .style("font", "12px Fira Sans")
    .style("text-anchor", "end");

  // Build X scales and axis:
  var y_heatmap = d3.scaleBand()
    .range([ height_heatmap, 0 ])
    .domain(tree_types)
    .padding(0.01);
  svg_heatmap.append("g")
    .call(d3.axisLeft(y_heatmap));

  // Build color scale
  var myColor = d3.scaleLinear()
    .range(["#86efac", "#14532d"])
    .domain([1, 34729])

  //Read the data
      svg_heatmap.selectAll()
        .data(data, function(d) {return d.city +':'+ d.scientific_name;})
        .enter()
        .append("rect")
        .attr("x", function(d) { return x_heatmap(d.city) })
        .attr("y", function(d) { return y_heatmap(d.scientific_name) })
        .attr("width", x_heatmap.bandwidth() )
        .attr("height", y_heatmap.bandwidth() )
        .style("fill", function(d) { return myColor(d.Total)} )

})