// set the dimensions and margins of the graph
var margin_percent = {top: 10, right: 30, bottom: 100, left: 50},
    width_percent = 1200 - margin_percent.left - margin_percent.right,
    height_percent = 700 - margin_percent.top - margin_percent.bottom;

// append the svg object to the body of the page
var svg_percent = d3.select("#stacked_percent")
  .append("svg")
    .attr("width", width_percent + margin_percent.left + margin_percent.right)
    .attr("height", height_percent + margin_percent.top + margin_percent.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_percent.left + "," + margin_percent.top + ")");

// Parse the Data
d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vQWan1dg4-fZLQ-gM9V8AR6cBW1DumszVHmQOu51s4vWOuRdLUoB5TzdX_pgO_Kf_1dlsVoU9waEkO5/pub?output=csv", function(data) {

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function(d){return(d.city)}).keys()

  // Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, width_percent])
      .padding([0.2])
  svg_percent.append("g")
    .attr("transform", "translate(0," + height_percent + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .selectAll("text")
    .attr("transform", "translate(-5, 10)rotate(-45)")
    .style("font", "12px Fira Sans")
    .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height_percent, 0 ]);
  svg_percent.append("g")
    .call(d3.axisLeft(y))
    .style("font", "15px Fira Sans");

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#86efac','#22c55e','#15803d', '#14532d'])

  // Normalize the data -> sum of each group must be 100!
  console.log(data)
  dataNormalized = []
  data.forEach(function(d){
    // Compute the total
    tot = 0
    for (i in subgroups){ temp=subgroups[i] ; tot += +d[temp] }
    // Now normalize
    for (i in subgroups){ temp=subgroups[i] ; d[temp] = d[temp] / tot * 100}
  })

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)

  // Show the bars
  svg_percent.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.city); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())
})