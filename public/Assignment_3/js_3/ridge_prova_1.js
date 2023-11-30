import { RadarChart } from "./radarChart.js";
import { updateRadarChart} from "./radar_chart.js";
import { updateLineChart } from "./line_chart.js";


function updateRidgeChart(selectedOption) {

    // Determine the CSV URL based on the selected option
    var csvURL;

    
    // console.log('PROVA Checked Boxes:', checkedValues);

    if (selectedOption === "west") {
        // Fatto
        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7i09PlQfdRCQO_lf7mxxei0klpyVkcvb9yssf8WLIHNBwI7FOYKroe4HGzN8aIE7PkkvENGRZMIHv/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxn9gnqzgt3UbgbLBjiV6HoUiTVoqT7_OiUXZm8bqJmRHyPYGNWI-fTJm7m3vWXFPgS6zvagU2lSNO/pub?output=csv"  // MIN
        ];

    } else if (selectedOption === "south") {
        // Fatto
        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJ2Q2rBrvPUKjUs6hzaSaW1BNAGOweIi23hYtbkoYmjtwe1hm-3tbFFjp8-C5IzvTfIzEZ_3tEIPjL/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vTh1lt6UOPpM1anRHzkahSSIFxJpy3bSAafFSuGeW-LyhzX82H7119YDjlSbBtxqCLlGxnyI4o2w4jJ/pub?output=csv" // MIN
        ];

    } else if (selectedOption === "west_north_central") {
        // Fatto
        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vRple2JTGsKq2CYU3GSVXs7nx_f6zBLlqZKJoXMnkVB705iVGJXA0Qsu_cPXC7vdFU84wePcpyfPB05/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQqhssGQA5zdupJv-CH2qIkGA7lddgxyM8ZaaiEHUZYBUMWqamJlHGXIK09Mk20vR6kpt8SGI2RIfQ7/pub?output=csv"  // MIN
        ];

    } else if (selectedOption === "central") {
        // Fatto
        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWcxdTiZ1aGmHs4fZThnm032LGaEQr0TBlQhLsYlz-h-Y3Qge1L4ZOb01wnkbWhHf1aGWYaE-0DzHY/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vT5G_yY5VaIl0pqhspkO6w60fITojpIro8K0f0GvVc5-BuT6Zc5Vcqr68ukbxZMRDoi509hafwe_Rxz/pub?output=csv"  // MIN
        ];

    } else if (selectedOption === "east_north_central") {
        // Fatto
        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyVrbecBeHUKc6RB4V03qvHo7BtnwgzUHqEnsS-y-FKo1oHATNq0y4rDZ6y-xP6dsCLYFmUyzBk-XS/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vR6FufvKS2ZrtKkOlbFcPjKyv8Fk1BSaVSagoyc50RVj06B69yfoo0s__nJ54qZeCqLjtWA5Y6PWdss/pub?output=csv"  // MIN
        ];

    } else if (selectedOption === "northwest") {
        // Fatto
        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQfBs6CQrUPK6vhA5SAL1MRjMBPg6IPxsWScxL72Hp605CnaPfBH6_4UVPYLuQpI-BliTUbycKpfjyi/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vTXbVuWs-GOERVB42wpcsn5LptbNbGFyshFJ0T623jfDFCyDvx53IEuekssDqioKJTDhbSGceI_iWU8/pub?output=csv"  // Link sbagliato MIN
        ];

    } else if (selectedOption === "northeast") {
        // Fatto
        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMtShtjCcm3E7rBwGCVyUwGDrRi3GFd-76f8WEmegXKncXFMstI4PSWIew46fIlYV50degWDpQliP0/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vTnmlIye4MkEros8bfmWUs89oivB1GlpDprG_UG2g2gMtLgHtVFE-y2jLGRv2-mg96nECkslBAWCfUt/pub?output=csv"  // MIN
        ];

    } else if (selectedOption === "southwest") {

        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNn_JbK-yYtDm6-HfZnvp4WUtGCRcSHha5c3sozfIMra6Rmj_Mw61UXizjE2z35wVNNF3gLgwQMTi/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQclI4EUDKpRCI--zmkpR6WAFDFu9qYqzd2IsARXLDayZLjFHA5GUi3nLyg9x2-ugbXGQrxjzEMLuhZ/pub?output=csv"  // MIN
        ];

    } else if (selectedOption === "southeast") {

        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vTaq70DVdzkMj8eyqCgCSQbUk2Af1mukhyQJmifhh7gm-0FS4bSdAqlftkUIzlY6_PGg8t_NstbdwA1/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQK5R17QdSa22BHCdWZoK5hv8ZazEsZrPa6C-DRX30cKj0yYkg0ToRUZC7RN9cIxrABluVO8KXgUA9F/pub?output=csv"  // MIN
        ];

    }


    d3.select("#my_ridge_chart").selectAll("svg").remove();

    // set the dimensions and margins of the graph
    var margin = {top: 60, right: 30, bottom: 200, left:110},
        width = 460 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_ridge_chart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");



    var max_value = 0.0;
    var min_value = 0.0;
    var maxColumn;
    var minColumn;
    var first = true;

    //read data
    // d3.csv("https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv", function(data) {
    fileUrls.forEach(function(fileUrl, index) {
        d3.csv(fileUrl, function(data) {

        if(first) {
            maxColumn = data.map(function(d) {
                return d.Max;
            });
            max_value = maxColumn[0];
            console.log("MAX VALUE:", max_value);

            minColumn = data.map(function(d) {
                return d.Min;
            });
            min_value = minColumn[0];
            console.log("MIN VALUE:", min_value);
            first = false;
        }

        // Get the different categories and count them
        //var categories = data.columns
        //var n = categories.length
        
        // Assuming data is a 2D array or object with columns
        var categories = data.columns;

        // Find the index of "Months" in the array
        var monthsIndex = categories.indexOf("Months");

        // Remove "Months", "Min", and "Max" from the array
        var filteredCategories = categories.slice(0, monthsIndex).concat(categories.slice(monthsIndex + 1, -2)).reverse();

        var n = filteredCategories.length

        // Now, filteredCategories contains all columns except "Months", "Min", and "Max"
        console.log("Filtered", filteredCategories);


        // Add X axis
        var x = d3.scaleLinear()
            //.domain([-10, 140])
            .domain([min_value, max_value])
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Create a Y scale for densities
        var y = d3.scaleLinear()
            .domain([0, 0.4])
            .range([ height, 0]);

        // Create the Y axis for names
        var yName = d3.scaleBand()
            //.domain(categories)
            .domain(filteredCategories)
            .range([0, height])
            .paddingInner(1)
        svg.append("g")
            .call(d3.axisLeft(yName));

        // Compute kernel density estimation for each column:
        var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
        var allDensity = []
        for (var i = 0; i < n; i++) {
            //var key = categories[i]
            var key = filteredCategories[i]
            var density = kde( data.map(function(d){  return d[key]; }) )
            allDensity.push({key: key, density: density})
            // console.log("Key", key);
            // console.log("Density", density);
        }

        // Add areas
        svg.selectAll("areas")
            .data(allDensity)
            .enter()
            .append("path")
            .attr("transform", function(d){return("translate(0," + (yName(d.key)-height) +")" )})
            .datum(function(d){return(d.density)})
            .attr("fill", "#69b3a2")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("d",  d3.line()
                .curve(d3.curveBasis)
                .x(function(d) { return x(d[0]); })
                .y(function(d) { return y(d[1]); })
            )

        }) // d3.csv
    }); // fileUrls.forEach

} // updateRidgeChart


updateLineChart("west");
updateRadarChart("west");
updateRidgeChart("west");


d3.select("#regionSelector").on("change", function() {
    var selectedOption = this.value;
    updateLineChart(selectedOption);
    updateRadarChart(selectedOption);
    updateRidgeChart(selectedOption);
    console.log("Option", selectedOption);
});


function setupChangeListener(selector) {
    d3.select(selector).on("change", function() {
        var selectedOption = d3.select("#regionSelector").node().value;
        //console.log("Selectedoption", selectedOption);
        updateRadarChart(selectedOption);
        //console.log("Selectedoption", selectedOption);
        updateLineChart(selectedOption);
        updateRidgeChart(selectedOption);
    });
}

setupChangeListener("#c_1900");
setupChangeListener("#c_1910");
setupChangeListener("#c_1920");
setupChangeListener("#c_1930");
setupChangeListener("#c_1940");
setupChangeListener("#c_1950");
setupChangeListener("#c_1960");
setupChangeListener("#c_1970");
setupChangeListener("#c_1980");
setupChangeListener("#c_1990");
setupChangeListener("#c_2000");
setupChangeListener("#c_2010");
setupChangeListener("#c_2020");


// -------- FUNCTIONS --------
// This is what I need to compute kernel density estimation
function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
      return [x, d3.mean(V, function(v) { return kernel(x - v); })];
    });
  };
}


function kernelEpanechnikov(k) {
  return function(v) {
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  };
}
