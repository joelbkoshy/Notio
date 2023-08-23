import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ScaleBand, ScaleLinear } from 'd3';

interface DataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const x: ScaleBand<string> = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y: ScaleLinear<number, number> = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal<string, string>()
      .domain(data.map(d => d.label))
      .range(d3.schemeCategory10);

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => x(d.label) || 0)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => y(0) - y(d.value))
      .attr('fill', d => color(d.label));

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

  }, [data]);

  return (
    <svg ref={svgRef} width={500} height={300}></svg>
  );
};

export default BarChart;
