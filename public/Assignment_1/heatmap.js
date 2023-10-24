
// HEATMAP
// set the dimensions and margins of the graph
var margin_heatmap = {top: 30, right: 30, bottom: 30, left: 30},
  width_heatmap = 450 - margin_heatmap.left - margin_heatmap.right,
  height_heatmap  = 450 - margin_heatmap.top - margin_heatmap.bottom;

// append the svg object to the body of the page
var svg_heatmap = d3.select("#my_heatmap")
.append("svg")
  .attr("width", width_heatmap  + margin_heatmap .left + margin_heatmap .right)
  .attr("height", height_heatmap  + margin_heatmap .top + margin_heatmap .bottom)
.append("g")
  .attr("transform",
        "translate(" + margin_heatmap.left + "," + margin_heatmap.top + ")");

// Labels of row and columns
var myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
var myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

// Build X scales and axis:
var x_heatmap = d3.scaleBand()
  .range([ 0, width_heatmap ])
  .domain(myGroups)
  .padding(0.01);
  svg_heatmap.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x_heatmap))

// Build X scales and axis:
var y_heatmap = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myVars)
  .padding(0.01);
svg_heatmap.append("g")
  .call(d3.axisLeft(y_heatmap));

// Build color scale
var myColor = d3.scaleLinear()
  .range(["white", "#69b3a2"])
  .domain([1,100])

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function(data) {
    
    svg_heatmap.selectAll()
      .data(data, function(d) {return d.group+':'+d.variable;})
      .enter()
      .append("rect")
      .attr("x", function(d) { return x_heatmap(d.group) })
      .attr("y", function(d) { return y_heatmap(d.variable) })
      .attr("width", x_heatmap.bandwidth() )
      .attr("height", y_heatmap.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )

})