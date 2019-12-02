import React, { Component } from 'react';
import *  as d3 from 'd3';

class Chart extends Component {

    componentDidMount() {   
        this.drawChart()
    }


    drawChart(){
    const canvas = d3.select(this.refs.canvas);
    console.log(this.props.val);
    const data = this.props.val;

    const width = 700;
    const height = 500;
    const margin = { top:10, left:50, bottom: 40, right: 10};
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top -margin.bottom;

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);
    console.log(data);
    let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear() 
        .domain([0, 1000000])
        .range([iheight, 0]);

    const x = d3.scaleBand()
    .domain(data.map(d => d.name) ) 
    .range([0, iwidth])
    .padding(0.1); 

    const bars = g.selectAll("rect").data(data);

    bars.enter().append("rect")
    .attr("class", "bar")
    .style("fill", "steelblue")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.views))
    .attr("height", d => iheight - y(d.views))
    .attr("width", x.bandwidth())  

    g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);  

    g.append("g")
    .classed("y--axis", true)
    .call(d3.axisLeft(y));
    }
    render() {
        return (
            <div>
                <div ref ="canvas"></div>
            </div>
        );
    }
}

export default Chart;