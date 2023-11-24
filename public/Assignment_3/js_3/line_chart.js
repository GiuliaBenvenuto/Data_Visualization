// https://docs.google.com/spreadsheets/d/e/2PACX-1vT7i09PlQfdRCQO_lf7mxxei0klpyVkcvb9yssf8WLIHNBwI7FOYKroe4HGzN8aIE7PkkvENGRZMIHv/pub?output=csv

function updateLineChart(selectedOption) {


    // Determine the CSV URL based on the selected option
    var csvURL;

    
    // console.log('PROVA Checked Boxes:', checkedValues);

    if (selectedOption === "west") {
        // Fatto
        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7i09PlQfdRCQO_lf7mxxei0klpyVkcvb9yssf8WLIHNBwI7FOYKroe4HGzN8aIE7PkkvENGRZMIHv/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxn9gnqzgt3UbgbLBjiV6HoUiTVoqT7_OiUXZm8bqJmRHyPYGNWI-fTJm7m3vWXFPgS6zvagU2lSNO/pub?output=csv",  // MIN
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vTh77p4ddzVOUFcH-kLs_OABWrnYbqVQ8227iLz-TJ-HT-nh300fxCj4pEoul4eFhpMsbrlLru8dVH3/pub?output=csv"   // AVERAGE
        ];

    } else if (selectedOption === "south") {
        // Fatto
        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJ2Q2rBrvPUKjUs6hzaSaW1BNAGOweIi23hYtbkoYmjtwe1hm-3tbFFjp8-C5IzvTfIzEZ_3tEIPjL/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vTh1lt6UOPpM1anRHzkahSSIFxJpy3bSAafFSuGeW-LyhzX82H7119YDjlSbBtxqCLlGxnyI4o2w4jJ/pub?output=csv",  // MIN
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsB1b8PUSRRoO4guxJXo-lAYWL17YWAkGZWMP2invr0ou93xxuTwNyTtyWOtqjtySvmz8A-4WSl7ZB/pub?output=csv"   // AVERAGE
        ];

    } else if (selectedOption === "west_north_central") {
        // Fatto
        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vRple2JTGsKq2CYU3GSVXs7nx_f6zBLlqZKJoXMnkVB705iVGJXA0Qsu_cPXC7vdFU84wePcpyfPB05/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQqhssGQA5zdupJv-CH2qIkGA7lddgxyM8ZaaiEHUZYBUMWqamJlHGXIK09Mk20vR6kpt8SGI2RIfQ7/pub?output=csv",  // MIN
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vSrSfXy17MSA9xIGVXPm3iRpS5cQazMD330PS1OiNB_gJwXtKGsleYmJtqgoDlJKCFQFU0skeQ2MMkA/pub?output=csv"   // AVERAGE
        ];

    } else if (selectedOption === "central") {
        // Fatto
        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWcxdTiZ1aGmHs4fZThnm032LGaEQr0TBlQhLsYlz-h-Y3Qge1L4ZOb01wnkbWhHf1aGWYaE-0DzHY/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vT5G_yY5VaIl0pqhspkO6w60fITojpIro8K0f0GvVc5-BuT6Zc5Vcqr68ukbxZMRDoi509hafwe_Rxz/pub?output=csv",  // MIN
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7dErpzPJi7QYP_rV-EDj2VvGMKpJMY_qQonUx5fbBelN0LlfWMlZY5TgMevdAiu0cFgDHfrB57Hl0/pub?output=csv"   // AVERAGE
        ];

    } else if (selectedOption === "east_north_central") {
        // Fatto
        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyVrbecBeHUKc6RB4V03qvHo7BtnwgzUHqEnsS-y-FKo1oHATNq0y4rDZ6y-xP6dsCLYFmUyzBk-XS/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vR6FufvKS2ZrtKkOlbFcPjKyv8Fk1BSaVSagoyc50RVj06B69yfoo0s__nJ54qZeCqLjtWA5Y6PWdss/pub?output=csv",  // MIN
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vTioWe7PZVx1g95e0dS-sT9f1TdfhIi6QJYszq86e0hJRfX1OO53DxY6xmjeub5HffJ8iTnbaQJOrv6/pub?output=csv"   // AVERAGE
        ];

    } else if (selectedOption === "northwest") {
        // Fatto
        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQfBs6CQrUPK6vhA5SAL1MRjMBPg6IPxsWScxL72Hp605CnaPfBH6_4UVPYLuQpI-BliTUbycKpfjyi/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vTXbVuWs-GOERVB42wpcsn5LptbNbGFyshFJ0T623jfDFCyDvx53IEuekssDqioKJTDhbSGceI_iWU8/pub?output=csv",  // Link sbagliato MIN
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4F5h8MeVc3L9p5suFguPDwrQIr2fRyvEE5FWajRyzMT0tEqycwLWXgf_D_8UviOlyqzKRgazR7xyG/pub?output=csv"   // AVERAGE
        ];

    } else if (selectedOption === "northeast") {
        // Fatto
        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMtShtjCcm3E7rBwGCVyUwGDrRi3GFd-76f8WEmegXKncXFMstI4PSWIew46fIlYV50degWDpQliP0/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vTnmlIye4MkEros8bfmWUs89oivB1GlpDprG_UG2g2gMtLgHtVFE-y2jLGRv2-mg96nECkslBAWCfUt/pub?output=csv",  // MIN
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vRkI2mVHQ4Y5GE50WgkMfEUQb_nU9FXORHSqgNVmKpGohjHf5OvnAoTkrGL9uLeFAiOHTCV0ytaddmy/pub?output=csv"   // AVERAGE
        ];

    } else if (selectedOption === "southwest") {

        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNn_JbK-yYtDm6-HfZnvp4WUtGCRcSHha5c3sozfIMra6Rmj_Mw61UXizjE2z35wVNNF3gLgwQMTi/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQclI4EUDKpRCI--zmkpR6WAFDFu9qYqzd2IsARXLDayZLjFHA5GUi3nLyg9x2-ugbXGQrxjzEMLuhZ/pub?output=csv",  // MIN
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWHBNsk_xXCQ-39hqsbT0pZZp57KilU8bczOSRXDEFtTXNJkBElrvZlTBE6E7m2ZGthA2QcbnhmmEW/pub?output=csv"   // AVERAGE
        ];

    } else if (selectedOption === "southeast") {

        var fileUrls = [
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vTaq70DVdzkMj8eyqCgCSQbUk2Af1mukhyQJmifhh7gm-0FS4bSdAqlftkUIzlY6_PGg8t_NstbdwA1/pub?output=csv",  // MAX
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQK5R17QdSa22BHCdWZoK5hv8ZazEsZrPa6C-DRX30cKj0yYkg0ToRUZC7RN9cIxrABluVO8KXgUA9F/pub?output=csv",  // MIN
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vRupRVGRHK2A20dXoXFUUr8y3EYtKR7Z9q3eBpJEVO9CuDVMl8k8hnOQp1qCzPhdjuayjYU0DGdAqhX/pub?output=csv"   // AVERAGE
        ];

    }


    d3.select("#my_dataviz").selectAll("svg").remove();

    // set the dimensions and margins of the graph
    var margin = {top: 50, right: 30, bottom: 30, left: 60},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var maxValue = 0.0;
    var minValue = 0.0;
    var maxColumn;
    var minColumn;
    var first = true;

    fileUrls.forEach(function(fileUrl, index) {
        // console.log("Index:", index);

        d3.csv(fileUrl, function(data) {

    
        if(first) {
            maxColumn = data.map(function(d) {
                return d.Max;
            });
            maxValue = maxColumn[0];
            console.log("MAX VALUE:", maxValue);

            minColumn = data.map(function(d) {
                return d.Min;
            });
            minValue = minColumn[0];
            console.log("MIN VALUE:", minValue);
            first = false;
        }
        console.log("Index:", index);
        console.log("MAX VALUE fuori:", maxValue);
        console.log("MIN VALUE fuori:", minValue);


        // Filter columns based on checkedValues after removing "c_" prefix
        var filteredColumns = checkedValues.map(function(column) {
            return column.replace("c_", "");
        }).filter(function(column) {
            return data.columns.includes(column); // Assuming data has a 'columns' property
        });
        // console.log("FILTERED:", filteredColumns);


        // group the data: I want to draw one line per group
        var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(function(d) { return d.name;})
            .entries(data);

        

        // X - axis
        var x = d3.scalePoint()
        .domain(data.map(function(d) { return d.Months;  }))         // This is what is written on the Axis: from 0 to 100
        .range([0, width]);      // This is where the axis is placed: from 100 px to 800px

        // Draw the axis
        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")      // This controls the vertical position of the Axis
            .call(d3.axisBottom(x));
        

        /* Y axis
        // Extract all column names except the first one ("Months")
        var columns = Object.keys(data[0]).slice(0);
        // console.log(columns);

        // Extract all values from the selected columns
        var allValues = data.reduce(function(acc, d) {
            columns.forEach(function(column) {
            acc.push(+d[column]);
            });
            return acc;
        }, []);
        // console.log(allValues);

        // Find the maximum value across all columns
        var maxValue = d3.max(allValues);
        // console.log(maxValue); */

        // Define the y-scale using the calculated maximum value
        var y = d3.scaleLinear()
            .domain([minValue, maxValue])
            .range([height, 0]);

        // Append the y-axis to the SVG
        svg.append("g")
            .call(d3.axisLeft(y));

        /* color palette
        var res = sumstat.map(function(d){ return d.key }) // list of group names
        var color = d3.scaleOrdinal()
            .domain(res)
            .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])
        */

        var color = d3.scaleOrdinal()
            .domain(fileUrls)
            .range(['#e41a1c', '#4daf4a', '#377eb8']); // Red, Green, Blue

            
            
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
            .style("color", "#333"); // Use a dark grey color for the text


        // Draw the line
        svg.selectAll(".line")
            .data(filteredColumns) // Use the filtered columns as the data
            .enter()
            .append("path")
            .attr("fill", "none")
            //.attr("stroke", function(column) { return color(column); })
            .attr("stroke", function (column, i) {
                // Use the color scale to assign color based on file URL index
                return color(fileUrls[index]);
            })
            .attr("stroke-width", 1.8)
            .attr("d", function(column) {
                return d3.line()
                    .x(function(d) { return x(d.Months); }) // Assuming 'Months' is the x-axis variable
                    .y(function(d) { return y(+d[column]); }) // Use the current column for the y-axis
                    (data.filter(function(d) {
                        return filteredColumns.includes(column); // Filter the data to include only the selected columns
                    }));
            })

        .each(function (d, i) {
        // Append dots at the end of each line segment
        svg.selectAll(".dot")
            .data(data.filter(function (row) {
                return filteredColumns.includes(d);
            }))
            .enter().append("circle")
            .attr("cx", function (row) { return x(row.Months); })
            .attr("cy", function (row) { return y(+row[d]); })
            .attr("r", 4)
            .attr("fill", color(fileUrls[index]))
            .attr("stroke", "#fff") // Add a white stroke for better visibility

            .on("mouseover", function (row) {
                tooltip.transition()
                    .duration(100)
                    .style("opacity", 0.9);
                tooltip.html(
                    "<div style='text-align: center;'>" +
                    "<span style='color: #333;'> <strong>" + getLabel(index) + "</strong></span><br>" +
                    "</div>" +
                    "<span style='color: #333;'> <strong>Value: </strong> " + row[d] + "</span><br>" +
                    "<span style='color: #333;'> <strong>Month: </strong> " + row.Months + "</span><br>" 
                    
                )
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0);
            });

        });

        // Function to get the label based on the index
        function getLabel(index) {
            if (index === 0) {
                return "Max";
            } else if (index === 1) {
                return "Min";
            } else if (index === 2) {
                return "Avg";
            } else {
                return "";
            }
        }
                
        }) // d3.csv

    }) // for
}

updateLineChart("west");

d3.select("#regionSelector").on("change", function() {
    var selectedOption = this.value;
    updateLineChart(selectedOption);
});


function setupChangeListener(selector) {
    d3.select(selector).on("change", function() {
        var selectedOption = d3.select("#regionSelector").node().value;
        //console.log("Selectedoption", selectedOption);
        updateLineChart(selectedOption);
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
