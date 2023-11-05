
// HEATMAP
import { addTitle, addTooltip } from "./utils.js";
function updateHeatmap(selectedOption) {

    // Determine the CSV URL based on the selected option
    var csvURL;
    if (selectedOption === "5") {
        csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSn35ldxZU6jKlHrkhxBieJjruVhOHoSK1-K3oi2ZVRp0eTCFKbjI79xZnv4hfJ252UpquFPtTaCo-u/pub?output=csv";
    } else if (selectedOption === "10") {
        csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQL82bVWYC_C8pfBt843yo0ca3pTE7uz5DntMs2sWm3CVTWrrqHuYaa2rYfVCGEaNBUDAGIpUEdBO0L/pub?output=csv";
    } else if (selectedOption === "15") {
        csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQRNFmhZzK9P24CY74TUyLV5xxxjdRkKEfd4xV-4WiCT-c5LL4CWh9LgykFL5fzFnJib5obvqKqOWNp/pub?output=csv";
    }
    d3.select("#my_heatmap").selectAll("svg").remove();

    d3.csv(csvURL, function(data) {
        var margin_heatmap = {top: 55, right: 30, bottom: 100, left: 120},
        width_heatmap = 650 - margin_heatmap.left - margin_heatmap.right,
        height_heatmap  = 450 - margin_heatmap.top - margin_heatmap.bottom;
    
        // append the svg object to the body of the page
        var svg_heatmap = d3.select("#my_heatmap")
        .append("svg")
            .attr("width", width_heatmap  + margin_heatmap .left + margin_heatmap .right)
            .attr("height", height_heatmap  + margin_heatmap .top + margin_heatmap .bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin_heatmap.left + "," + margin_heatmap.top + ")");

        // Your code for creating the heatmap goes here, similar to your existing code
        var cities = d3.map(data, function(d){return(d.city)}).keys()

        // List of subgroups = header of the csv files = soil condition here
        var tree_types = d3.map(data, function(d){return(d.scientific_name)}).keys()

        // Build X scales and axis:
        var x_heatmap = d3.scaleBand()
        .range([ 0, width_heatmap ])
        .domain(cities)
        .padding(0.01);
        svg_heatmap.append("g")
        .attr("transform", "translate(0," + height_heatmap + ")")
        .call(d3.axisBottom(x_heatmap))
        .selectAll("text")
        .attr("transform", "translate(-5, 10)rotate(-45)")
        .style("font", "12px Fira Sans")
        .style("text-anchor", "end");

        // Build X scales and axis:
        var y_heatmap = d3.scaleBand()
        .range([ height_heatmap, 0 ])
        .domain(tree_types)
        .padding(0.01);
        svg_heatmap.append("g")
        .call(d3.axisLeft(y_heatmap));

        // Build color scale
        var myColor = d3.scaleLinear()
        .range(["#86efac", "#14532d"])
        .domain([1, 34729])

        // Define a tooltip div
       var tooltip = addTooltip(d3.select('body'));

        svg_heatmap.selectAll()
        .data(data, function(d) {return d.city +':'+ d.scientific_name;})
        .enter()
        .append("rect")
            .attr("x", function(d) { return x_heatmap(d.city) + 1 })
            .attr("y", function(d) { return y_heatmap(d.scientific_name) })
            .attr("width", x_heatmap.bandwidth() )
            .attr("height", y_heatmap.bandwidth() )
            .style("fill", function(d) { return myColor(d.Total)} )
            .on("mouseover", function(d) {
            // Show the tooltip and set its content
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            tooltip.html("<strong>Total: </strong>" + d.Total)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
            // Hide the tooltip on mouseout
            tooltip.transition()
                .duration(200)
                .style("opacity", 0);
            });   
            // Title
               addTitle(svg_heatmap, "Top-" + selectedOption + " city's number of trees per category", "20px", "#14532d", (width_heatmap / 2), 0 - (margin_heatmap.top / 2));
    });    
}

updateHeatmap("5");

d3.select("#topNSelector").on("change", function() {
    var selectedOption = this.value;
    updateHeatmap(selectedOption);
});




