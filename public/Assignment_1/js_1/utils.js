export function createGrid(svg, grid_dir, y_stack, width_stack, num_ticks, stroke_color, stroke_dasharray) {
    svg.selectAll(grid_dir)
      .data(y_stack.ticks(num_ticks))
      .enter()
      .append("line")
        .attr("x1", 0)
        .attr("x2", width_stack)
        .attr("y1", function(d) { return y_stack(d); })
        .attr("y2", function(d) { return y_stack(d); })
        .attr("stroke", stroke_color)
        .attr("stroke-dasharray", stroke_dasharray);
  };