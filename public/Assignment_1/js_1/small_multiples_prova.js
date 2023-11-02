// https://docs.google.com/spreadsheets/d/e/2PACX-1vQWan1dg4-fZLQ-gM9V8AR6cBW1DumszVHmQOu51s4vWOuRdLUoB5TzdX_pgO_Kf_1dlsVoU9waEkO5/pub?output=csv
  
  // Chart dimensions
  const width = 300; // Adjust the width for side-by-side charts
  const height = 300; // Adjust the height for side-by-side charts
  const margin = { top: 10, right: 20, bottom: 80, left: 100 };
  
  
  
  d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vQWan1dg4-fZLQ-gM9V8AR6cBW1DumszVHmQOu51s4vWOuRdLUoB5TzdX_pgO_Kf_1dlsVoU9waEkO5/pub?output=csv", function(data) {

    const categories = ["Acer_Platanoides", "Lagerstroemia_Indica", "Platanus_Acerifolia", "Other"];
    
    categories.forEach(category => {
        const svg = d3.select("#stacked_small_multiples")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .style("display", "inline-block") // Display charts side by side
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        // Filter the data for the current category
        const categoryData = data.map(d => ({ city: d.city, value: +d[category] }));

        // Scales
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(categoryData, d => d.value)])
            .nice()
            .range([0, width - margin.left - margin.right]);

        const yScale = d3.scaleBand()
            .domain(categoryData.map(d => d.city))
            .range([0, height - margin.top - margin.bottom])
            .padding(0.1);

        
        // Draw bars for each category
        // Draw bars for the current category
        svg.selectAll("rect")
            .data(categoryData)
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", d => yScale(d.city))
            .attr("width", d => xScale(d.value))
            .attr("height", yScale.bandwidth())
            .attr("fill", "steelblue");

        // X-axis
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        // Y-axis
        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(yScale));

        // Category label
        svg.append("text")
            .attr("x", 110)
            .attr("y", height - margin.top - margin.bottom + 50) // Changed to move labels down by 10 pixels
            .style("text-anchor", "end") // Changed to align labels to the right
            .text(category);
        
    });
});