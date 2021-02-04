import React, { Component } from 'react';
import "./GraphSlider.css";
// import Output from './output1.json';

class GraphSlider extends Component {
    constructor(props) {
        super(props);

        const Output = this.props.data;
        this.createSlider = this.createSlider.bind(this);
        this.svgRef = React.createRef();
        this.createLine = this.createLine.bind(this);

        this.state = {
            minLoc: 50,
            svgWidth: 400,
            svgHeight: 400,
            graphWidth: 300,
            graphHeight: 300,
            tickNum: 4,
            lines: Object.keys(Output['pointsData']).length,
            slideDist: 150,
            ceilDist: 300,
            dragging: false,
            data: Output.pointsData,
            x1: 0,
            x2: 300,
            y1: 0,
            y2: 300,
            title: Output.title
        }
    }

    createSlider() {
        return (
            <polygon
                points={
                [
                    [this.state.slideDist - 15 + this.state.minLoc, this.state.ceilDist + 35 + this.state.minLoc],
                    [this.state.slideDist + 15 + this.state.minLoc, this.state.ceilDist + 35 + this.state.minLoc],
                    [this.state.slideDist + this.state.minLoc, this.state.ceilDist + 20 + this.state.minLoc]
                ]
                }
                onMouseDown={e => {
                    e.preventDefault();
                    this.setState({dragging: true})
                }}
            />
        )
    }

    createLine() {
        return (
            <rect
                x={this.state.slideDist + this.state.minLoc}
                y={this.state.ceilDist - 250}
                width="2"
                height="300"
                fill="black"
            />
        )
    }

    render() {
        return (
            <div className="carrier">
                <div>
                    <h1 ref={this.titleRef}>{this.state.title}</h1>
                </div>
                <svg 
                width={this.state.svgWidth} 
                height={this.state.svgHeight} 
                ref={this.svgRef}
                // Handles Dragging
                onMouseMove={e => {
                    e.preventDefault();
                    if (this.state.dragging) {
                        var svg = this.svgRef.current;
                        var pt = svg.createSVGPoint();
                        pt.x = e.clientX;
                        var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
                        var newX = svgP.x - this.state.minLoc;
                        if ((newX > 0) && (newX < this.state.graphWidth)) {
                            this.setState({slideDist: newX});
                        }
                    }
                }}
                // Handles mouse being raised
                onMouseUp={e => {
                    e.preventDefault();
                    this.setState({dragging: false})
                }}>
                    <rect width="2" height={this.state.graphWidth} x={this.state.minLoc} y={this.state.minLoc} fill="black"/>
                    <rect width={this.state.graphHeight} height="2" x={this.state.minLoc} y={298 + this.state.minLoc} fill="black"/>
                    {[...Array(this.state.tickNum).keys()].map(
                        (tick) =>
                        <rect
                            width="2"
                            height="5"
                            fill="black"
                            x={(this.state.graphWidth / this.state.tickNum) * (tick + 1) + this.state.minLoc} 
                            y={295 + this.state.minLoc}
                        />
                    )}
                    {[...Array(this.state.tickNum).keys()].map(
                        (tick) =>
                        <rect
                            width="5"
                            height="2"
                            fill="black"
                            x={this.state.minLoc} 
                            y={(this.state.graphHeight / this.state.tickNum) * tick + this.state.minLoc}
                        />
                    )}
                    {[...Array(this.state.lines).keys()].map(
                        (line) =>
                            [...Array(this.state.data[line.toString()].points).keys()].map(
                                (point) =>
                                    <circle 
                                    cx={this.state.data[line.toString()][point.toString()].x + this.state.minLoc}
                                    cy={this.state.data[line.toString()][point.toString()].y + this.state.minLoc}
                                    r="3"
                                    fill={this.state.data[line.toString()].color}
                                    stroke={this.state.data[line.toString()].color}
                                    />
                            )
                    )}
                    {[...Array(this.state.lines).keys()].map(
                        (line) =>
                            [...Array(this.state.data[line.toString()].points - 1).keys()].map(
                                (point) =>
                                    <line
                                    x1={this.state.data[line.toString()][point.toString()].x + this.state.minLoc}
                                    y1={this.state.data[line.toString()][point.toString()].y + this.state.minLoc}
                                    x2={this.state.data[line.toString()][(point + 1).toString()].x + this.state.minLoc}
                                    y2={this.state.data[line.toString()][(point + 1).toString()].y + this.state.minLoc}
                                    stroke-width="2"
                                    stroke={this.state.data[line.toString()].color}
                                    />
                            )
                    )}
                    {this.createSlider()}
                    {this.createLine()}
                </svg>
                <div class="legend">
                    {[...Array(this.state.lines).keys()].map(
                        (line) => 
                            <div>
                                <div class="color-box" style={{ backgroundColor: this.state.data[line.toString()].color }}></div>
                                <span class="option">{this.state.data[line.toString()].name}</span>
                            </div>
                    )}
                </div>
            </div>
        )
    }
}

export default GraphSlider;