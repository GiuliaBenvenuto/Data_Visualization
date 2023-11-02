const data = [
      { category: 'A', values: [10, 20, 15, 25] },
      { category: 'B', values: [15, 10, 5, 30] },
      { category: 'C', values: [25, 5, 20, 15] },
    ];

    // Chart dimensions
    const width = 200; // Adjust the width for side-by-side charts
    const height = 200; // Adjust the height for side-by-side charts
    const margin = { top: 10, right: 20, bottom: 20, left: 40 };

    // Create an SVG for each category and position them side by side
    const svg = d3.select("#stacked_small_multiples")
      .selectAll("svg")
      .data(data)
      .enter()
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("display", "inline-block") // Display charts side by side
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleBand()
      .domain(data[0].values.map((_, i) => i + 1))
      .range([0, width - margin.left - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.max(d.values))])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    // Draw bars for each category
    svg.selectAll("rect")
      .data(d => d.values)
      .enter()
      .append("rect")
      .attr("x", (_, i) => xScale(i + 1))
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.top - margin.bottom - yScale(d))
      .attr("fill", "steelblue");

    // X-axis
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSize(0));

    // Y-axis
    svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));

    // Category labels
    svg.append("text")
      .attr("x", (width - margin.left - margin.right) / 2)
      .attr("y", height - 10)
      .style("text-anchor", "middle")
      .text(d => `Category ${d.category}`);
