function createBarChart() {
  // set the dimensions and margins of the graph
  var margin_city = { top: 40, right: 100, bottom: 100, left: 110 },
    width_city = 800 - margin_city.left - margin_city.right,
    height_city = 700 - margin_city.top - margin_city.bottom;

  // append the svg object to the body of the page
  var svg_city = d3
    .select("#horizontal_barchart")
    .append("svg")
    .attr("width", width_city + margin_city.left + margin_city.right)
    .attr("height", height_city + margin_city.top + margin_city.bottom)
    .append("g")
    .attr("transform", "translate(" + margin_city.left + "," + margin_city.top + ")");


  // load the data
  d3.csv(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYwM2PtZzr74DXvzNH2rv4cQ33ip3bG5MB0mB7jTT0OV2db0H-PB8gw_zmyGddtOTxHY9ldCVCDcHE/pub?output=csv",
    function (data) {

      // X axis
      var x_city = d3.scaleLinear()
        .range([0, width_city])
        .domain([0, data[0].Total]);


      // Add X axis grid lines
      svg_city
      .selectAll("xGrid")
      .data(x_city.ticks(12)) // You can change the number of ticks as per your preference
      .enter()
      .append("line")
        .attr("x1", function(d) { return x_city(d); })
        .attr("x2", function(d) { return x_city(d); })
        .attr("y1", 0)
        .attr("y2", height_city)
        .attr("stroke", "lightgray") // Adjust the color as needed
        .attr("stroke-dasharray", "4"); // You can adjust the dash pattern if desired

        

      // Y axis
      var y_city = d3
        .scaleBand()
        .range([0, height_city])
        .domain(data.map(function (d) {
          return d.city;
        }))
        .padding(0.2);
        // change something because the bar overlap the y-axis
      
      svg_city
        .append("g")
        .call(d3.axisLeft(y_city))
        .style("font", "15px Fira Sans");


      svg_city.append("g")
          .attr("transform", "translate(0," + height_city + ")")
          .call(d3.axisTop(x_city).ticks(12))
          .selectAll("text")
          .attr("transform", "translate(10, 20)rotate(-45)")
          .style("font", "12px Fira Sans")
          .style("text-anchor", "end");
        // the ticks are not aligned with the bar and is the direction is wrong  
      /*
      var colorScale = d3.scaleSequential(function(t) {
        // Reverse the gradient to start with dark green for high values
        return d3.rgb(0, 200 + (1 - t) * 5, 0);
      })
        .domain([0, d3.max(data, function(d) { return d.Total; })]);*/


      var colorScale = d3.scaleLinear();
        colorScale.domain([0, data[0].Total])
        colorScale.range(['#bbf7d0', '#15803d'])

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
        

      // Bars
      svg_city
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x_city(0) + 1;})
        .attr("y", function (d) {
          return y_city(d.city);
        })
        .attr("width", function (d) {
          return x_city(d.Total);
        })
        .attr("height", y_city.bandwidth())
        //.attr("fill", "#14532d");
        // .attr("fill", function(d) { return colorScale(d.Total); });
        .attr('fill', function(data, index){
          return colorScale(data.Total)
        })
        .on("mouseover", function(d) {
          tooltip.transition()
            .duration(100)
            .style("opacity", 0.8);
          tooltip.html("Value: " + d.Total)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          tooltip.transition()
            .duration(300)
            .style("opacity", 0);
        });


      // Add title
      svg_city
        .append("text")
        .attr("x", width_city / 2)
        .attr("y", -20) // Adjust the y-coordinate to position the title
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("fill", "#14532d")
        .text("Top-20 number of trees per city");

      // Animation
      // the bars start to became bigger and bigger form the top to the bottom.
      // maybe is better if the transition works from the bottom to the top
      
      svg_city
      .selectAll("rect")
      .attr("width", 0) // set the initial width to 0
      .transition()
      .duration(600)
      .attr("x", function(d) { return x_city(0) + 1;})
      .attr("width", function (d) {
        return x_city(d.Total); // set the final width with the value of the data
      })
      .delay(function (d, i) {
        return i * 100;
      });
    }
  );
}


// Create the chart when the chart container is visible in the window
// To make this work i wrapped everything in function createBarChart() {}
const chartContainer = document.querySelector("#horizontal_barchart");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        createBarChart(); // Call your chart creation function
        observer.disconnect(); // Disconnect the observer to avoid creating the chart multiple times
      }
    });
  },
  { threshold: 0.2 } // Adjust the threshold as needed
);

// Start observing the chart container
observer.observe(chartContainer);
