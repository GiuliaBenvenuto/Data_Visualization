// https://docs.google.com/spreadsheets/d/e/2PACX-1vT1x9iuNt9qyb3i-CvSppvvGmJlWc8uziTrmXAbKadPZ3q894cyEwiQKjuMKHdg35_oBW4WzAzCsWql/pub?output=csv


//Width and height of map
var width = 1000;
var height = 500;

// D3 Projection
var projection = d3.geo.albersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([1100]);          // scale things down so see entire US
        
// Define path generator
var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
		  	 .projection(projection);  // tell path generator to use albersUsa projection

		



            

var svg = d3.select("#my_choropleth_aboundance")
	.append("svg")
	.attr("width", width)
	.attr("height", height);
	
// Append Div for tooltip to SVG
var div = d3.select("body")
	.append("div")   
	.attr("class", "tooltip")               
	.style("opacity", 0);




// Load GeoJSON data and merge with states data
d3.json("../Assignment_4/json_4/us-states.json", function(json) {

    
    // Map the cities I have lived in!
    // d3.csv("../Assignment_4/cities-lived.csv", function(data) {
    // d3.csv("../Assignment_4/Coord_trees_state.csv", function(data) {
    // d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vQoZ2K9t0hRKfh9CsosvhXHArNGujt8K8EBvZXhUSXGOJzYKbgrHhOI1jnOaaaWe4vrCKmHjnVS2Gv_/pub?output=csv", function(data) {

    d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vS4-n1eY5SgU0wua0Wwd7yuI1KDZ02IjQPCUAFqXVjeTW3S2SlPtAtVFMzxp6fwxKXt4lAJPf_rg5_u/pub?output=csv", function(data) {


	var maxColumn = data.map(function(d) {
		return d.max;
	});
	var max_value = maxColumn[0];
	max_value = parseFloat(max_value);
	
	var minColumn = data.map(function(d) {
		return d.min;
	});
	var min_value = minColumn[0];
	min_value = parseFloat(min_value);

	// Define linear scale for output
	var colorScale = d3.scaleLinear();
        colorScale.domain([min_value, max_value])
        colorScale.range(['#bbf7d0', '#15803d'])


	// Create a map for quick lookup of value by state name
	var dataMap = {};
	data.forEach(function(d) {
		dataMap[d.state] = +d.value; // Convert value to a number if it's a string
	});

	var tooltip = d3.select('body')
            .append("div")
            .style("position", "absolute")
            .style("background", "#f0f0f0") // Use a light grey color for the background
            .style("padding", "10px")
            .style("border", "1px solid #ccc") // Use a darker grey for the border
            .style("border-radius", "8px")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .style("font", "15px Fira Sans")
            .style("color", "#333");


	// Bind the data to the SVG and create one path per GeoJSON feature
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", "3")
        .style("fill", function(d) {
			// Use the state name from the GeoJSON to get the value from the data map
			var value = dataMap[d.properties.name];
			if (value) {
				return colorScale(value);
			} else {
				// If no data is available, default to a neutral color
				return "#ccc";
			}
		})

		.on("mouseover", function(d) {
			// Get the value for this state
			var value = dataMap[d.properties.name];
			// If the value is undefined, set it to 0
			if (value === undefined) {
				value = 0;
			}
			
			tooltip.transition()
				.duration(100)
				.style("opacity", .9);
			tooltip.html(
				"<strong>State:</strong> " + d.properties.name + "<br>" +
				"<strong>Value:</strong> " + value
			)
			.style("left", (d3.event.pageX) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function() {
			tooltip.transition()
				.duration(100)
				.style("opacity", 0);
		});
		
});  
     

});

