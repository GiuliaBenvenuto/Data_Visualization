// Sample data
const data = [
    { category: 'A', values: [10, 20, 30] },
    { category: 'B', values: [15, 25, 35] },
    // Add more data objects for each category
];

// Chart dimensions
const width = 200;
const height = 150;

// Scales
const xScale = d3.scaleBand()
    .domain(data[0].values.map((d, i) => i))
    .range([0, width])
    .padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d3.sum(d.values))])
    .nice()
    .range([height, 0]);

const colorScale = d3.scaleOrdinal()
    .domain(data.map(d => d.category))
    .range(d3.schemeCategory10);

// Create small multiples
data.forEach((d, i) => {
    const svg = d3.select(`#stacked_percent${i + 1}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(0,0)`);

    svg.selectAll("rect")
        .data(d.values)
        .enter()
        .append("rect")
        .attr("x", (d, j) => xScale(j))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(0) - yScale(d))
        .attr("fill", colorScale(d.category));
});