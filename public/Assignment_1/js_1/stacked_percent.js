// set the dimensions and margins of the graph
var margin_percent = {top: 10, right: 30, bottom: 100, left: 50},
    width_percent = 900 - margin_percent.left - margin_percent.right,
    height_percent = 600 - margin_percent.top - margin_percent.bottom;

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

  svg_percent.selectAll("yGrid")
    .data(y.ticks(10)) // You can change the number of ticks as per your preference
    .enter()
    .append("line")
      .attr("x1", 0)
      .attr("x2", width_percent)
      .attr("y1", function(d) { return y(d); })
      .attr("y2", function(d) { return y(d); })
      .attr("stroke", "lightgray") // Adjust the color as needed
      .attr("stroke-dasharray", "4"); // You can adjust the dash pattern if desired


  // color palette = one color per subgroup
  // Color palette with inverted order such that the first one from the bottom is "other"
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#14532d','#15803d','#22c55e', '#86efac'])


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


  // Define the order of the keys to visualize the percentage in the same way of the stacked barchart (to be consistent)
  var customOrder = ["Other", "Platanus_Acerifolia", "Lagerstroemia_Indica", "Acer_Platanoides"];

  // Reorder the array subgroups in the same order of customOrder
  var orderedSubgroups = customOrder.filter(key => subgroups.includes(key));

  // Use the ordered array
  var stackedData = d3.stack()
      .keys(orderedSubgroups)
      (data);


  // Define the div for the tooltip (show value in a small div on mouse hover)
  var tooltip = d3.select("body").append("div")
    .style("position", "absolute")
    .style("background", "white")
    .style("padding", "5px")
    .style("border", "1px solid #214328")
    .style("border-radius", "5px")
    .style("pointer-events", "none")
    .style("opacity", 0)
    .style("font", "15px Fira Sans")
    .style("color", "#214328");
  

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
      .on("mouseover", function(d) {
        tooltip.transition()
          .duration(100)
          .style("opacity", 0.8);
        tooltip.html( //show clearly the number of differtent species in a city on mouse hover
          "<span style='color: #14532d;'>Acer Platanoides: " + (d.data.Acer_Platanoides).toFixed(3) + "%" + "</span><br>" +
          "<span style='color: #15803d;'>Lagerstroemia Indica: " + (d.data.Lagerstroemia_Indica).toFixed(3) + "%" + "</span><br>"+
          "<span style='color: #22c55e;'>Platanus Acerifolia: " + (d.data.Platanus_Acerifolia).toFixed(3) + "%" + "</span><br>" +
          "<span style='color: #86efac;'>Other: " + (d.data.Other).toFixed(3) + "%" + "</span>"
          )
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltip.transition()
          .duration(300)
          .style("opacity", 0);
      });
})