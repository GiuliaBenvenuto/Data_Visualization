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

		
// Define linear scale for output
var color = d3.scale.linear()
			  .range(["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]);

var legendText = ["Cities Lived", "States Lived", "States Visited", "Nada"];

/*
var svg = d3.select("#my_dot_density_map")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

Create SVG element and append map to the SVG
var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);*/

    var svg = d3.select("#my_dot_density_map_1")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
        
    // Append Div for tooltip to SVG
    var div = d3.select("body")
        .append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

// Load in my states data!


// Load GeoJSON data and merge with states data
d3.json("../Assignment_4/json_4/us-states.json", function(json) {
		
    // Bind the data to the SVG and create one path per GeoJSON feature
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", "3")
        .style("fill", "#e1e1e1")

    

    d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vQoZ2K9t0hRKfh9CsosvhXHArNGujt8K8EBvZXhUSXGOJzYKbgrHhOI1jnOaaaWe4vrCKmHjnVS2Gv_/pub?output=csv", function(data) {
    // d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vSgVCcVZo8wQEH4Rijbwprt-VySj2xhIuh8zMW2i-SGW5PSzi7wy_62m2Amu3wBwaroyEeRA1zV0lqC/pub?output=csv", function(data) {
    
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

    svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return projection([d.long_coor, d.lat_coor])[0];
    })
    .attr("cy", function(d) {
        return projection([d.long_coor, d.lat_coor])[1];
    })
    .attr("r", function(d) {
            // console.log(Math.sqrt(d.value) * 0.05);
            return Math.sqrt(d.value) * 0.07; // Adjust radius calculation as needed
        })
    .style("fill", "#107b42")
    .style("opacity", 0.65) // Ensure this is high enough to be visible
    .style("stroke", "#0c6b38") // setting the stroke color to grey
    .style("stroke-width", 1)

        
	.on("mouseover", function(d) {      
    	tooltip.transition()        
      	   .duration(100)      
           .style("opacity", .9); 
           
           tooltip.html(
                "<span style='color: #333;'> <strong>State: </strong> " + d.state + "</span><br>" + 
                "<span style='color: #333;'> <strong>City: </strong> " + d.city + "</span><br>" +
                "<span style='color: #333;'> <strong>Value: </strong> " + d.value + "</span><br>"
            )
           .style("left", (d3.event.pageX) + "px")     
           .style("top", (d3.event.pageY - 28) + "px");    
	})   

    // fade out tooltip on mouse out               
    .on("mouseout", function(d) {       
        tooltip.transition()        
           .duration(100)      
           .style("opacity", 0);   
    });
});  
     

});

