// https://docs.google.com/spreadsheets/d/e/2PACX-1vT1x9iuNt9qyb3i-CvSppvvGmJlWc8uziTrmXAbKadPZ3q894cyEwiQKjuMKHdg35_oBW4WzAzCsWql/pub?output=csv


const treeColorDictionary = {
    "Platanus acerifolia": "#402365",  
    "Acer platanoides": "#8A2BE2",
    "Gleditsia triacanthos": "#4267AC", 
    "Pyrus calleryana": "#1982C4", 
    "Lagerstroemia indica": "#52A675", 
    "Fraxinus pennsylvanica": "#8AC926",
    "Acer rubrum": "#C5CA30", 
    "Tilia cordata": "#FFCA3A", 
    "Liquidambar styraciflua": "#FF924C",
    "Quercus palustris": "#B46058",
    "Other": "#808080"
};


//Width and height of map
var width = 1500;
var height = 600;

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

            

    var svg = d3.select("#my_dot_density_map_2")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Append title to SVG
    svg.append("text")
    .attr("x", width / 2)             
    .attr("y", 30) // You can adjust this value to move the title up or down
    .attr("text-anchor", "middle")  
    .style("font-size", "20px")
    .style("font-family", "'Fira Sans', sans-serif")  
    .style("font-weight", "bold")
    .style("fill", "#333") // Use a dark color for the text for better readability
    .text("Tree concentration of the top-10 scientific name + other in the United States");
        

    // Append Div for tooltip to SVG
    var div = d3.select("body")
        .append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

    // Create a legend container
    // Legend dimensions
    var legendRectSize = 15; // defines the size of the legend rectangles
    var legendSpacing = 6; // defines the spacing between the rectangles

    var legend = svg.selectAll('.legend') 
    .data(Object.keys(treeColorDictionary)) 
    .enter() 
    .append('g') 
    .attr('class', 'legend') 
    .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing; 
        var offset = height * Object.keys(treeColorDictionary).length / 2; 
        var horz = 4 * legendRectSize; 
        var vert = i * height + height/2; 
        return 'translate(' + horz + ',' + vert + ')'; 
    });

    // Adding a rectangle to each legend item
    legend.append('rect') 
    .attr('width', legendRectSize) 
    .attr('height', legendRectSize) 
    .style('fill', function(d) { return treeColorDictionary[d]; }) 
    //.style('stroke', function(d) { return treeColorDictionary[d]; }); 
    .style("stroke", "black") // Add black border
    .style("stroke-width", 1)

    // Adding text to each legend item
    legend.append('text')
    .attr('x', legendRectSize + legendSpacing) 
    .attr('y', legendRectSize - legendSpacing + 4) 
    .text(function(d) { return d; }); 


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

    

		 
    // Map the cities I have lived in!
    // d3.csv("../Assignment_4/cities-lived.csv", function(data) {
    // d3.csv("../Assignment_4/Coord_trees_state.csv", function(data) {
    // d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vQoZ2K9t0hRKfh9CsosvhXHArNGujt8K8EBvZXhUSXGOJzYKbgrHhOI1jnOaaaWe4vrCKmHjnVS2Gv_/pub?output=csv", function(data) {

    d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vQGFgFbKBipYl0R-ftaRoQ91xlg37UXXNfVMcM3kOtV_7twbmG287juwuatcAymp10kBORqp7K8DoGv/pub?output=csv", function(data) {

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
        return projection([d.longitude_coordinate, d.latitude_coordinate])[0];
    })
    .attr("cy", function(d) {
        return projection([d.longitude_coordinate, d.latitude_coordinate])[1];
    })
    .attr("r", function(d) {
            // console.log(Math.sqrt(d.value) * 0.05);
            return Math.sqrt(d.value) * 0.2; // Adjust radius calculation as needed
        })
    // .style("fill", "#107b42")
    .style("fill", function(d) {
        return treeColorDictionary[d.Color];
    })

    .style("opacity", 0.65) // Ensure this is high enough to be visible

    // .style("stroke", "#0c6b38") // setting the stroke color to grey
    .style("stroke", function(d) {
        // return treeColorDictionary[d.Color];
        var baseColor = treeColorDictionary[d.Color];
        // Use d3.color to parse and manipulate the color
        var darkerColor = d3.color(baseColor).darker(0.2); // The argument to darker() determines how much darker the color should be
        return darkerColor;
    })

    .style("stroke-width", 1)

        
	.on("mouseover", function(d) {      
    	tooltip.transition()        
      	   .duration(100)      
           .style("opacity", .9); 
           
           tooltip.html(
                "<span style='color: #333;'> <strong>State: </strong> " + d.state + "</span><br>" + 
                "<span style='color: #333;'> <strong>City: </strong> " + d.city + "</span><br>" +
                "<span style='color: #333;'> <strong>Value: </strong> " + d.value + "</span><br>" + 
                "<span style='color:  #333;'> <strong>Scientific name:</strong></span>" +
                "<span style='color:" + treeColorDictionary[d.Color] + ";'> " + d.Color + "</span><br>"
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

