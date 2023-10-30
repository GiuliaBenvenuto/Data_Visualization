// set the dimensions and margins of the graph
var margin_stack = {top: 10, right: 30, bottom: 100, left: 60},
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

    svg_stack.selectAll("yGrid")
      .data(y_stack.ticks(10)) // You can change the number of ticks as per your preference
      .enter()
      .append("line")
        .attr("x1", 0)
        .attr("x2", width_stack)
        .attr("y1", function(d) { return y_stack(d); })
        .attr("y2", function(d) { return y_stack(d); })
        .attr("stroke", "lightgray") // Adjust the color as needed
        .attr("stroke-dasharray", "4"); // You can adjust the dash pattern if desired
    

  // color palette = one color per subgroup
  var color_stack = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#86efac','#22c55e','#15803d', '#14532d'])


  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)

  // console.log(stackedData)

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

  // ERROR: we need to fix the bars because the dimension of each type don't correspond to the data
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
            .style("opacity", 0.8);
          tooltip.html( //show clearly the number of differtent species in a city on mouse hover
          "<span style='color: #14532d;'>Acer Platanoides: " + d.data.Acer_Platanoides + "</span><br>" +
          "<span style='color: #15803d;'>Platanus Acerifolia: " + d.data.Platanus_Acerifolia + "</span><br>" +
           "<span style='color: #22c55e;'>Lagerstroemia Indica: " + d.data.Lagerstroemia_Indica + "</span><br>" +
          "<span style='color: #86efac;'>Other: " + d.data.Other + "</span>"
            )
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          tooltip.transition()
            .duration(300)
            .style("opacity", 0);
        });

});