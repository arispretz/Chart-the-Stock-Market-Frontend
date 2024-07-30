import React, { useEffect, useContext, useRef } from 'react';
import { StockDataContext } from '../context/StockDataContext';
import * as d3 from 'd3';

const width = 800;
const height = 400;

const StockChart = () => {
  const { data } = useContext(StockDataContext);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    if (!data || !Array.isArray(data.stockData) || data.stockData.length === 0) {
      return;
    }

    const xScale = d3.scaleTime()
      .domain(d3.extent(data.stockData, d => new Date(d.timestamp)))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data.stockData, d => d.price), d3.max(data.stockData, d => d.price)])
      .nice()
      .range([height, 0]);

    const line = d3.line()
      .x(d => xScale(new Date(d.timestamp)))
      .y(d => yScale(d.price));

    svg.append('path')
      .datum(data.stockData)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(d3.timeDay.every(1)).tickFormat(d3.timeFormat('%b %d')));

    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale));
  }, [data]);

  return (
    <div className="chart-container">
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default StockChart;
