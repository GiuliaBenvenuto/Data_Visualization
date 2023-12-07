import { RadarChart } from "./radarChart.js";
import { updateRadarChart} from "./radar_chart.js";
import { updateLineChart } from "./line_chart.js";


function updateRidgeChart(selectedOption) {


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
    var margin = {top: 80, right: 100, bottom: 200, left:100},
        width = 1100 - margin.left - margin.right,
        height = 900 - margin.top - margin.bottom;

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


    fileUrls.forEach(function(fileUrl, index) {
        d3.csv(fileUrl, function(data) {

        if(first) {
            maxColumn = data.map(function(d) {
                return d.Max;
            });
            max_value = maxColumn[0];
            max_value = parseFloat(max_value);

            minColumn = data.map(function(d) {
                return d.Min;
            });
            min_value = minColumn[0];
            min_value = parseFloat(min_value);
            first = false;
        }
        
        // Assuming data is a 2D array or object with columns
        var categories = data.columns;

        // Find the index of "Months" in the array
        var monthsIndex = categories.indexOf("Months");

        // Remove "Months", "Min", and "Max" from the array
        var filteredCategories = categories.slice(0, monthsIndex).concat(categories.slice(monthsIndex + 1, -2)).reverse();

        var n = filteredCategories.length

        // Now, filteredCategories contains all columns except "Months", "Min", and "Max"
        console.log("Filtered", filteredCategories);

        // Filter columns based on checkedValues after removing "c_" prefix
        var selectedCheck = checkedValues.map(function(column) {
            return column.replace("c_", "");
        }).filter(function(column) {
            return data.columns.includes(column); // Assuming data has a 'columns' property
        });
        console.log("Selected", selectedCheck);


        // Add X axis
        var x = d3.scaleLinear()
            .domain([min_value - 5, max_value + 10])
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")  // Select all the text elements for customization
            .style("font-size", "15px")
            .style("font-family", "Fira Sans")

        var spacing = height / n;

        // Compute kernel density estimation for each column:
        var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(100)) // increase this 40 for more accurate density.
        var allDensity = []
        var ymax=0;
        for (var i = 0; i <= n; i++) {
            //var key = categories[i]ù
            //var keys = index;
            var key = filteredCategories[i]
            var density = kde( data.map(function(d){  return d[key]; }) )
            let max = d3.max(density, function(d) { return d[1]; });
            if (max > ymax) {
                ymax = max;
            }
            allDensity.push({key: key, density: density})
            //allDataDict[keys] = allDensity;
            // console.log("Key", key);
            // console.log("Density", density);
        }

        // Create a Y scale for densities
        var y = d3.scaleLinear()
        .domain([0, ymax])
        .range([spacing, 0]);

        // Create the Y axis for names
        var yName = d3.scaleBand()
            .domain(filteredCategories)
            .range([1, height])
            .paddingInner(1);
    
            
        console.log("YName", yName);

        svg.append("g")
            .call(d3.axisLeft(yName))
            .selectAll("text")  // Select all the text elements for customization
            .style("font-size", "15px")
            .style("font-family", "Fira Sans")
            

            allDensity = allDensity.filter(entry => entry.key !== undefined);
        
            svg.selectAll("line.y-axis-line")
            .data(allDensity.map(d => d.key))
            .enter()
            .append("line")
            .attr("class", "y-axis-line")
            .attr("x1", 0)
            .attr("x2", width) // Adjust 'width' based on your chart dimensions
            .attr("y1", d => yName(d))
            .attr("y2", d => yName(d))
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            


              svg.selectAll("areas")
            .data(allDensity)
            .enter()
            .append("path")
              //.attr("transform", d => "translate(0," + (yName(d.key) - spacing) +")" )
              .attr("transform", d => {
                const translateY = yName(d.key);
    
                // Apply the transformation for valid numeric values
                return "translate(0," + (translateY - spacing) + ")";
            })
            .attr("fill", function(d, i) {
                console.log("d", d.key);
                if (selectedCheck.includes(d.key)) {
                    if (index === 0) {
                        return "#e41a1c"; // First round color
                    } else if (index === 1) {
                        return "#377eb8"; // Second round color 377eb8
                    } else {
                        return "#D3D3D3"; // Default color
                    }
                }
            })

            .attr("stroke", function(d, i) {
                if (selectedCheck.includes(d.key)) {
                    if (index === 0) {
                        return "#920000"; // First round color
                    } else if (index === 1) {
                        return "#00417c"; // Second round color 377eb8
                    } else {
                        return "#D3D3D3"; // Default color
                    }
                }
            })

            .attr("stroke-width", 1)
            .attr("opacity", function(d, i) {
            if (selectedCheck.includes(d.key)) {
                if (index === 0) {
                    return 0.8; // First round opacity
                } else if (index === 1) {
                    return 0.8; // Second round opacity
                } else {
                    c = "#D3D3D3";
                    return 0.7; // Default opacity
                }
            } else {
                return 0.2; // Opacity when not in selectedCheck
            }
            })
            .attr("d",  d => {
            let p = d3.area()
                .curve(d3.curveBasis)
                .x(d => x(d[0]))
                .y0(y(0))
                .y1(d => y(d[1]))(d.density);
            return p;
            });


            // LEGEND
            // Assuming you have a color dictionary
var colorDictionary = {
    'Max': 'red',
    'Min': 'blue'
};


// Create a legend container
var legend = svg.append("g")
    .attr("class", "legend")
    //.attr("transform", "translate(" + (width / 2) + ", -10)")
    .attr("transform",
            "translate(" + 390 + "," + -80 + ")")
    
    ; // Adjust the translation for vertical position

// Function to update the legend based on the selected years
function updateLegend(selectedYears) {
    // Remove existing legend items
    legend.selectAll("*").remove();

    // Add a colored square and text for each selected year
    var legendItems = legend.selectAll(".legend-item")
        .data(selectedYears)
        .enter().append("g")
        .attr("class", "legend-item")
        .attr("transform", function(d, i) {
            return "translate(" + (i * 80) + ", 0)"; // Adjust the spacing between squares
        });

    legendItems.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", function(d) {
            return colorDictionary[d];
        })
        .style("stroke", "black") // Add black border
        .style("stroke-width", 1);

    legendItems.append("text")
        .attr("x", 20)
        .attr("y", 10)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) {
            return d;
        });
}

// Call the function with the desired legend items
updateLegend(['Max', 'Min']);





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
