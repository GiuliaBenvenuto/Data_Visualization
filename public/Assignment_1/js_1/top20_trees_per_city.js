// HORIZONAL BAR CHART
import { createGrid, addTitle, addTooltip } from "./utils.js";
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
  d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTYwM2PtZzr74DXvzNH2rv4cQ33ip3bG5MB0mB7jTT0OV2db0H-PB8gw_zmyGddtOTxHY9ldCVCDcHE/pub?output=csv", function (data) {

      // X axis
      var x_city = d3.scaleLinear()
        .range([0, width_city])
        .domain([0, data[0].Total]);

      // Add X axis grid lines
      createGrid(svg_city, "xGrid", x_city, height_city, 12, "lightgray", "4");

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


      var colorScale = d3.scaleLinear();
        colorScale.domain([0, data[0].Total])
        colorScale.range(['#bbf7d0', '#15803d'])

      // Define the div for the tooltip (show value in a small div on mouse hover)
       var tooltip = addTooltip(d3.select('body'));

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
            .style("opacity", 0.9);
          tooltip.html("<strong>Value: </strong>" + d.Total)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          tooltip.transition()
            .duration(200)
            .style("opacity", 0);
        });

      // Add title
      addTitle(svg_city, "Top-20 number of trees per city", "20px", "#14532d", width_city / 2, -20);

      // Animation
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

