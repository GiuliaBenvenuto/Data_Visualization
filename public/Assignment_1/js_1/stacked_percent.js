// set the dimensions and margins of the graph
var margin_percent = {top: 10, right: 30, bottom: 20, left: 50},
    width_percent = 460 - margin_percent.left - margin_percent.right,
    height_percent = 400 - margin_percent.top - margin_percent.bottom;

// append the svg object to the body of the page
var svg_percent = d3.select("#stacked_percent")
  .append("svg")
    .attr("width", width_percent + margin_percent.left + margin_percent.right)
    .attr("height", height_percent + margin_percent.top + margin_percent.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_percent.left + "," + margin_percent.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv", function(data) {

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function(d){return(d.group)}).keys()

  // Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, width_percent])
      .padding([0.2])
  svg_percent.append("g")
    .attr("transform", "translate(0," + height_percent + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height_percent, 0 ]);
  svg_percent.append("g")
    .call(d3.axisLeft(y));

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e41a1c','#377eb8','#4daf4a'])

  // Normalize the data -> sum of each group must be 100!
  console.log(data)
  dataNormalized = []
  data.forEach(function(d){
    // Compute the total
    tot = 0
    for (i in subgroups){ name=subgroups[i] ; tot += +d[name] }
    // Now normalize
    for (i in subgroups){ name=subgroups[i] ; d[name] = d[name] / tot * 100}
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
        .attr("x", function(d) { return x(d.data.group); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())
})