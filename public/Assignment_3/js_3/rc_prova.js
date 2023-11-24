import { RadarChart } from "../js_3/radarChart.js";

////////////////////////////////////////////////////////////// 
//////////////////////// Set-Up ////////////////////////////// 
////////////////////////////////////////////////////////////// 

var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = Math.min(400, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
    console.log("WIDTH", window.innerWidth);
        
////////////////////////////////////////////////////////////// 
////////////////////////// Data ////////////////////////////// 
////////////////////////////////////////////////////////////// 

d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vT7i09PlQfdRCQO_lf7mxxei0klpyVkcvb9yssf8WLIHNBwI7FOYKroe4HGzN8aIE7PkkvENGRZMIHv/pub?output=csv", function(data) {
    // Extract values from the "Months" column
    var monthsColumn = data.map(function(d) {
        return d.Months;
    });

    // Now, monthsColumn contains an array of values from the "Months" column
    // console.log(monthsColumn);

    // Extract values from the "1900" column (second column)
    var column1900 = data.map(function(d) {
        return d["1900"];
    });

    // Now, column1900 contains an array of values from the "1900" column
    // console.log(column1900);

    // Create an array to store the new format of data
    var newData = [];

    // Iterate through the months and create the new format
    for (var i = 0; i < monthsColumn.length; i++) {
        var newDataPoint = {
            axis: monthsColumn[i],  // Use the month as the "axis" label
            value: column1900[i]    // Use the corresponding value as the "value" label
        };

        newData.push(newDataPoint);
    }

    var newDataWrapped = [newData];
    console.log("NEW_DATA_WRAPPED", newDataWrapped);

    /*
    var data = [
            [//iPhone
            {axis:"Battery Life",value:0.22},
            {axis:"Brand",value:0.28},
            {axis:"Contract Cost",value:0.29},
            {axis:"Design And Quality",value:0.17},
            {axis:"Have Internet Connectivity",value:0.22},
            {axis:"Large Screen",value:0.02},
            {axis:"Price Of Device",value:0.21},
            {axis:"To Be A Smartphone",value:0.50}			
            ]
        ];
    */

////////////////////////////////////////////////////////////// 
//////////////////// Draw the Chart ////////////////////////// 
////////////////////////////////////////////////////////////// 

var color = d3.scaleOrdinal()
    .range(["#EDC951", "#CC333F", "#00A0B0"]);
    
var radarChartOptions = {
    w: width,
    h: height,
    margin: margin,
    maxValue: 0.5,
    levels: 5,
    roundStrokes: true,
    color: color
};


//Call function to draw the Radar chart
RadarChart("#my_radarchart_1", newDataWrapped, radarChartOptions);
RadarChart("#my_radarchart_2", newDataWrapped, radarChartOptions);
RadarChart("#my_radarchart_3", newDataWrapped, radarChartOptions);

});

