// https://docs.google.com/spreadsheets/d/e/2PACX-1vT7i09PlQfdRCQO_lf7mxxei0klpyVkcvb9yssf8WLIHNBwI7FOYKroe4HGzN8aIE7PkkvENGRZMIHv/pub?output=csv

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv", function(data) {
  d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vT7i09PlQfdRCQO_lf7mxxei0klpyVkcvb9yssf8WLIHNBwI7FOYKroe4HGzN8aIE7PkkvENGRZMIHv/pub?output=csv", function(data) {
  // group the data: I want to draw one line per group
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.name;})
    .entries(data);

  // Add X axis --> it is a date format
  var x = d3.scaleBand()
    .domain(data.map(function(d) { return d.Months; }))
    .range([0, width])
    .padding(0.1);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)); 

  svg.selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  // Y axis
  // Extract all column names except the first one ("Months")
  var columns = Object.keys(data[0]).slice(0);
  console.log(columns);

  // Extract all values from the selected columns
  var allValues = data.reduce(function(acc, d) {
    columns.forEach(function(column) {
      acc.push(+d[column]);
    });
    return acc;
  }, []);
  console.log(allValues);

  // Find the maximum value across all columns
  var maxValue = d3.max(allValues);
  console.log(maxValue);

  // Define the y-scale using the calculated maximum value
  var y = d3.scaleLinear()
      .domain([0, maxValue])
      .range([height, 0]);

  // Append the y-axis to the SVG
  svg.append("g")
      .call(d3.axisLeft(y));

  // color palette
  var res = sumstat.map(function(d){ return d.key }) // list of group names
  var color = d3.scaleOrdinal()
    .domain(res)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

  // Draw the line
  svg.selectAll(".line")
    .data(columns) // Use the column names as the data
    .enter()
    .append("path")
    .attr("fill", "none")
    .attr("stroke", function(column) { return color(column); })
    .attr("stroke-width", 1.5)
    .attr("d", function(column) {
        return d3.line()
            .x(function(d) { return x(d.Months); }) // Assuming 'Months' is the x-axis variable
            .y(function(d) { return y(+d[column]); }) // Use the current column for the y-axis
            (data);
    });

})