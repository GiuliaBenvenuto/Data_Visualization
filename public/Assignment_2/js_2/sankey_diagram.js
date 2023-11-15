
function updateSankey(selectedOption) {

    // Determine the CSV URL based on the selected option
    var csvURL;
    var plotTitle;

    if (selectedOption === "east_north_central") {

        // With location:
        csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6W0VnB74aQbLZeubTcnnlhmAvIo7kzzYScYpko4RQUTdxMCLWZPiJ1Sq-7b-u2QwU5wIJsTIlL5kq/pub?output=csv";
        // csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQnAD3h3-FPBpmMrXxqgRNYkhuw1-uL_O388J4-LJGvMtuNi-pluHLsoneEqOFhJ9-Nc0-SVedhdq1F/pub?output=csv";
        // csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwOi-nD7X2Kdak53aTJdoLldS6SmMvk3ffEmTzDyU-QPmsQTklnWYZa2fTT3LSm01u0CqRvUuh02Am/pub?output=csv";
        plotTitle = "East North Central Trees";

    } else if (selectedOption === "west_north_central") {
        csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7e20gUnegzCFoc6dk4s5tng9HXxqwLbrwp69mMsBwf1W0Lt2YgWKrQUQ9tmRrMYHo4vdC_NoBwvpe/pub?output=csv";
        plotTitle = "West North Central Trees";
    } else if (selectedOption === "south_atlantic") {
        csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTarot56_qrvd51UAgmRIAhVV8Zttv1dat3OrHa75h9fUxGhD_g4Xf5vWwV0lNQwYn8v20K9UxPSAJi/pub?output=csv";
        plotTitle = "South Atlantic Trees";
    } else if (selectedOption === "east_south_central") {
        csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFBFvG-gg70lYWzHqJnNK0Y83So6qVlgQUz3AvkezxqQdat786CP8U3uq8HNKFqXB4U86wOb7aMPef/pub?output=csv";
        plotTitle = "East South Central Trees";
    } else if (selectedOption === "mountain") {
        csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRO-EcrvxljUa6KtGnZnWLJT62CXN6bRPOz5yRdRU42nUezdLUi4LalKFTbr2WS7TYCWbDBsl6o3tq2/pub?output=csv";
        plotTitle = "Mountain Trees";
    } else if (selectedOption === "pacific") {
        csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRA4b9ieyjEChfPF4cQnRTkK1H3qfvA46-wZ-XD5VUycDM47n5CaBendKXU6PgMINrGUqjEI3HYi7x_/pub?output=csv";
        plotTitle = "Pacific Trees";
    } 

    d3.select("#sankey_diagram").selectAll("svg").remove();

    d3.csv(csvURL).then(function(data) {
    //d3.csv(csvURL, function(data) {

// set the dimensions and margins of the graph
var margin = {top: 0, right: 40, bottom: 70, left: 60},
    width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;  

// format variables
var formatNumber = d3.format(",.0f"), // zero decimal places
    format = function(d) { return formatNumber(d); },
    color = d3.scaleOrdinal(d3.schemeCategory10);
  
// append the svg object to the body of the page
var svg = d3.select("#sankey_diagram").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", 
	          "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([width, height]);
    //.nodeSort(null); // creates sankey nodes as ordered in the data 

var path = sankey.links();

// load the data
//d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vQwOi-nD7X2Kdak53aTJdoLldS6SmMvk3ffEmTzDyU-QPmsQTklnWYZa2fTT3LSm01u0CqRvUuh02Am/pub?output=csv").then(function(data) {

  //set up graph in same style as original example but empty
  sankeydata = {"nodes" : [], "links" : []};

  data.forEach(function (d) {
    sankeydata.nodes.push({ "name": d.source });
    sankeydata.nodes.push({ "name": d.target });
    sankeydata.links.push({ "source": d.source,
                       "target": d.target,
                       "value": +d.value });
   });

  // return only the distinct / unique nodes
  sankeydata.nodes = Array.from(
    d3.group(sankeydata.nodes, d => d.name),
	([value]) => (value)
  );

  // loop through each link replacing the text with its index from node
  sankeydata.links.forEach(function (d, i) {
    sankeydata.links[i].source = sankeydata.nodes
      .indexOf(sankeydata.links[i].source);
    sankeydata.links[i].target = sankeydata.nodes
      .indexOf(sankeydata.links[i].target);
  });

  // now loop through each nodes to make nodes an array of objects
  // rather than an array of strings
  sankeydata.nodes.forEach(function (d, i) {
    sankeydata.nodes[i] = { "name": d };
  });

  graph = sankey(sankeydata);

  // add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", d3.sankeyLinkHorizontal())
      .attr("stroke-width", function(d) { return d.width; });

  // add the link titles
  link.append("title")
        .text(function(d) {
    		    return d.source.name + " → " + 
                d.target.name + "\n" + d.value; });

  // add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node");

  // add the rectangles for the nodes
  node.append("rect")
      .attr("x", function(d) { return d.x0; })
      .attr("y", function(d) { return d.y0; })
      .style("stroke", "black")
      .style("stroke-width", 2)
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { 
	  return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) { 
	  return d3.rgb(d.color).darker(2); })
      ;

  // add the title for the nodes
  node.append("title")
      .text(function(d) { 
          return d.name + "\n" + d.value; });

  // add in the text for the nodes
  node.append("text")
      .attr("x", function(d) { return d.x0 - 6; })
      .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(function(d) { return d.name; })
      .style("fill", function(d) { return d.color; })
    .filter(function(d) { return d.x0 < width / 2; })
      .attr("x", function(d) { return d.x1 + 6; })
      .attr("text-anchor", "start");

      
  // Add a title to the plot
  svg.append("text")
  .attr("x", width / 2)
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "20px")
  .style("fill", "#404040")
  .style("font-family", "'Fira Sans', sans-serif")
  .text(plotTitle);
  




 // Add hover effects to nodes
 node.on("mouseover", function() {
     d3.select(this)
         .attr("font-weight", "bold");
 })
 .on("mouseout", function() {
     d3.select(this)
         .attr("font-weight", "normal");
 });

// Add hover effects to links
link.on("mouseover", function() {
    d3.select(this)
        .attr("stroke-width", function(d) { console.log(d.width); if (d.width < 4) return 4; else return d.width; });
})
.on("mouseout", function() {
    d3.select(this)
        .attr("stroke-width", function(d) { return d.width; });
});

});
}

updateSankey("east_north_central");

d3.select("#topNSelector").on("change", function() {
    var selectedOption = this.value;
    updateSankey(selectedOption);
});