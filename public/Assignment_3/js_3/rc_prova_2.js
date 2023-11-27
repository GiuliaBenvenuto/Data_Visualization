import { RadarChart } from "../js_3/radarChart.js";

    ////////////////////////////////////////////////////////////// 
    //////////////////////// Set-Up ////////////////////////////// 
    ////////////////////////////////////////////////////////////// 
function updateRadarChart(selectedOption) {

    // Determine the CSV URL based on the selected option
    var csvURL;
    
    console.log('PROVA Checked Boxes:', checkedValues);

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


    var margin = {top: 100, right: 100, bottom: 100, left: 100},
        width = Math.min(400, window.innerWidth - 10) - margin.left - margin.right,
        height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
        console.log("WIDTH", window.innerWidth);
            
    ////////////////////////////////////////////////////////////// 
    ////////////////////////// Data ////////////////////////////// 
    ////////////////////////////////////////////////////////////// 

    fileUrls.forEach(function(fileUrls, index) {
        d3.csv(fileUrls, function(data) {
            console.log("INDEX", index);
            // d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vT7i09PlQfdRCQO_lf7mxxei0klpyVkcvb9yssf8WLIHNBwI7FOYKroe4HGzN8aIE7PkkvENGRZMIHv/pub?output=csv", function(data) {
            // Extract values from the "Months" column
            var monthsColumn = data.map(function(d) {
                return d.Months;
            });

            // Now, monthsColumn contains an array of values from the "Months" column
            // console.log(monthsColumn);


            // Filter columns based on checkedValues after removing "c_" prefix
            var filteredColumns = checkedValues.map(function(column) {
                return column.replace("c_", "");
            }).filter(function(column) {
                return data.columns.includes(column); // Assuming data has a 'columns' property
            });
             console.log("FILTERED:", filteredColumns);


            /* Extract values from the "1900" column (second column)
            var column1900 = data.map(function(d) {
                return d["1900"];
            });*/

            var colonne = [];
            for (var j = 0; j < filteredColumns.length; j++) {
                colonne[j] = data.map(function(d) {
                    return d[filteredColumns[j]];
                });

            }
            console.log("COLONNE", colonne);

            // Now, column1900 contains an array of values from the "1900" column
            // console.log(column1900);

            // Create an array to store the new format of data
            var newData = [];

            
            // Iterate through the months and create the new format
            for (var anno; anno < colonne.length; anno++) {
                for (var i = 0; i < monthsColumn.length; i++) {
                    var newDataPoint = {
                        axis: monthsColumn[i],  // Use the month as the "axis" label
                        //value: column1900[i]    // Use the corresponding value as the "value" label
                        value: colonne[anno][i]
                    }
                    console.log("NEW_DATA_POINT", newDataPoint);

                    newData.push(newDataPoint);
                }
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
        RadarChart("#my_radarchart_1", newDataWrapped, radarChartOptions); // MIN
        RadarChart("#my_radarchart_2", newDataWrapped, radarChartOptions); // MAX
        RadarChart("#my_radarchart_3", newDataWrapped, radarChartOptions); // AVG

        }); // d3.js
    }); // fileUrls.forEach

}

updateRadarChart("west");

d3.select("#regionSelector").on("change", function() {
    var selectedOption = this.value;
    updateRadarChart(selectedOption);
    console.log("SELECTED OPTION", selectedOption);
});


function setupChangeListener(selector) {
    d3.select(selector).on("change", function() {
        var selectedOption = d3.select("#regionSelector").node().value;
        //console.log("Selectedoption", selectedOption);
        updateRadarChart(selectedOption);
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