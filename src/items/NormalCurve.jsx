import React, { Component } from 'react';
import './NormalCurve.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getExpt,
  storeAnswer,
  getItemData
} from "../actions/dataActions";


// safeguard everything below with if (!Object.keys(this.props.data).length == 0)
class NormalCurve extends Component {
  constructor(props) {
    super(props);

    this.sliderRef = React.createRef();
    this.rectRef = React.createRef();
    this.svgRef = React.createRef();
    this.areaRef = React.createRef();

    this.dotReturn = this.dotReturn.bind(this);
    this.curveArea = this.curveArea.bind(this);
    this.triMouseDown = this.triMouseDown.bind(this);
    this.triDrag = this.triDrag.bind(this);
    this.triUp = this.triUp.bind(this);
    this.curveArea = this.curveArea.bind(this);

    this.resetState = this.resetState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // onchange
    // onsubmit

    this.state = this.initialState;
  }

  get initialState() {
    // console.log(this.props.expt);

    const unitHeight = this.props.data["max-height"];
    const circRad = this.props.data["circle-radius"];
    const distancing = circRad * 4 - 1;
    const height = (Math.ceil((distancing * unitHeight) / 50) + 1) * 50;
    const ceilDist = height - 50;
    const length = Math.ceil((distancing * this.props.data["len1"] * 2 + distancing * this.props.data["len2"] * 2) / 100) * 100;
    const colNum = Math.round(length / distancing);
    // console.log(height, distancing, ceilDist, colNum);
    return {
      submitted: false,      
      x: 0, y: 0, isDown: false,
      rectX: 12.5,
      down: false,
      svgWidth: length,
      svgHeight: height,
      svgX: 6,
      len1: this.props.data["len1"],
      colValHeiS: this.props.data["colValHeiS"],
      len2: this.props.data["len2"],
      colValHeiS2: this.props.data["colValHeiS2"],
      distancing: distancing,
      distancing1: (this.props.data["len2"] + 1) * distancing,
      distancing2: (this.props.data["len1"] + this.props.data["len2"] + 4) * distancing,
      triCent1: Math.round((0.5 * this.props.data["len1"]) * distancing) + distancing,
      triCent2: Math.round((0.5 * this.props.data["len2"]) * distancing) + distancing,
      mousePointerRange: 0,
      triDown: false,
      col11: this.props.data["len2"] + 1,
      col12: this.props.data["len1"] + this.props.data["len2"] + 1,
      col21: this.props.data["len1"] + this.props.data["len2"] + 3,
      col22: this.props.data["len1"] + 2 * this.props.data["len2"] + 3,
      colLim1: Math.round((length - (this.props.data["len1"] * distancing)) / distancing),
      colLim2: Math.round((length - (this.props.data["len2"] * distancing)) / distancing),
      overlapVals: this.props.data["overlapVals"],
      circRad: circRad,
      ceilDist: ceilDist
    }
  }

  resetState() {
    this.setState(this.initialState);
  }

  componentDidMount() {
    const { childRef } = this.props;
    childRef(this);
    this.getData();
  }

  componentWillUnmount() {
    const { childRef } = this.props;
    childRef(undefined);
  }

  getData() {
    const db = this.props.expt.dbInfo.db;
    const studyName = this.props.expt.dbInfo.col.split("-")[0];
    const exptName = this.props.expt.dbInfo.col.split("-")[1];
    this.props.getExpt(db, studyName, exptName);
  }

  // add user x positions in here
  onSubmit() {
    const question = this.props.questionNC;
    this.props.storeAnswer("Question", question);
    this.props.storeAnswer("graph1xpos", this.state.col11);
    this.props.storeAnswer("graph2xpos", this.state.col21);
    this.props.storeAnswer("area", this.state.overlapVals[Math.abs(this.state.col22 - this.state.col11)])
    this.setState({ submitted: true });
  }

  dotReturn(xPos, yPos) {
    const xPosOrig = xPos;

    if (xPos > 7) {
      xPos = 15 - xPos;
    }

    const CX = this.state.distancing1 + this.state.distancing * xPosOrig + 10;
    const CY = this.state.ceilDist - this.state.distancing * yPos + 10;

    // const soft = <circle className="icon" stroke="#555" fill="#555" fillOpacity="0.3" strokeOpacity="0.4" cx={CX} cy={CY} r="2"></circle>;
    var hard = <circle className="icon" stroke="DarkCyan" fill="DarkCyan" fillOpacity="0.3" strokeOpacity="0.3" cx={CX} cy={CY} r={this.state.circRad}></circle>;

    return hard;
  }

  dotReturn2(xPos, yPos) {
    const xPosOrig = xPos;

    if (xPos > 7) {
      xPos = 15 - xPos;
    }

    const CX = this.state.distancing2 + this.state.distancing * xPosOrig + 10;
    const CY = this.state.ceilDist - this.state.distancing * yPos + 10;

    // const soft = <circle className="icon" stroke="#555" fill="#555" fillOpacity="0.3" strokeOpacity="0.4" cx={CX} cy={CY} r="2"></circle>;
    var hard = <circle className="icon" stroke="Crimson" fill="Crimson" fillOpacity="0.3" strokeOpacity="0.3" cx={CX} cy={CY} r={this.state.circRad}></circle>;

    return hard;
  }

  triMouseDown(e, num) {
    if (e.type === "mousedown") {
      // console.log("MOUSEDOWN");
      e.preventDefault();
      var svgPre = this.svgRef.current;
      // Set mousePointerRange so that we know the distance
      // from the mouse tip to the x-value of the triangle
      // tip
      var ptPre = svgPre.createSVGPoint();
      ptPre.x = e.clientX;
      var svgPPre = ptPre.matrixTransform(svgPre.getScreenCTM().inverse());
      if (num === 1) {
        this.setState(prevState => ({
          // rectX : svgP.x,
          triDown: num,
          mousePointerRange: prevState.triCent1 + this.state.distancing1 - svgPPre.x
        }));
      }
      else if (num === 2) {
        this.setState(prevState => ({
          // rectX : svgP.x,
          triDown: num,
          mousePointerRange: prevState.triCent2 + this.state.distancing2 - svgPPre.x
        }));
      }
      // console.log(this.state);
    }
  }

  triDrag(e) {
    // Set mousePointerRange so that we know the distance
    // from the mouse tip to the x-value of the triangle
    // tip
    var svgPre = this.svgRef.current;
    var ptPre = svgPre.createSVGPoint();
    ptPre.x = e.clientX;
    var svgPPree = ptPre.matrixTransform(svgPre.getScreenCTM().inverse());
    this.setState({ x: e.screenX, y: e.screenY, svgX: svgPPree.x });
    if (this.state.triDown === 2) {
      // console.log("DRAG CONT'D");
      var svg = this.svgRef.current;
      var pt = svg.createSVGPoint();
      pt.x = e.clientX;
      var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
      e.preventDefault();
      var x = svgP.x - this.state.triCent2 + this.state.mousePointerRange;
      var col = Math.round((x - 6) / this.state.distancing);
      if (col < 0) {
        this.setState({ distancing2: 0, col21: 0, col22: this.state.len2 - 1 });
      }
      else if (col > this.state.colLim2) {
        this.setState({ distancing2: this.state.distancing * this.state.colLim2, col21: this.state.colLim2, col22: this.state.colLim2 + this.state.len2 - 1 })
      }
      else {
        this.setState({ distancing2: this.state.distancing * col, col21: col, col22: col + this.state.len2 - 1 });
      }
      this.curveArea(col);
      // this.setState({ distancing2 : x })
    }
    else if (this.state.triDown === 1) {
      // console.log("DRAG CONT'D");
      var svg = this.svgRef.current;
      var pt = svg.createSVGPoint();
      pt.x = e.clientX;
      var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
      e.preventDefault();
      var x = svgP.x - this.state.triCent1 + this.state.mousePointerRange;
      var col = Math.round((x - 6) / this.state.distancing);
      if (col < 0) {
        this.setState({ distancing1: 0, col11: 0, col12: this.state.len1 - 1 });
      }
      else if (col > this.state.colLim1) {
        this.setState({ distancing1: this.state.distancing * this.state.colLim1, col11: this.state.colLim1, col2: this.state.colLim1 + this.state.len1 - 1 })
      }
      else {
        this.setState({ distancing1: this.state.distancing * col, col11: col, col12: col + this.state.len1 - 1 });
      }
      this.curveArea(col);
      // this.setState({ distancing2 : x })
    }
  }

  triUp(e) {
    // console.log("UP");
    if (this.state.triDown) {
      this.setState({ triDown: false });
    }
  }

  curveArea(col) {
    if (this.state.col11 > this.state.col22 || this.state.col12 < this.state.col21) {
      this.areaRef.current.innerHTML = 0;
    }
    else {
      // console.log(this.state.col22, this.state.col11, Math.abs(this.state.col22 - this.state.col11));
      this.areaRef.current.innerHTML = this.state.overlapVals[Math.abs(this.state.col22 - this.state.col11)];
    }
  }

  render() {
    
    return (
      <div onMouseMove={e => this.triDrag(e)} onMouseUp={e => this.triUp(e)}>
        <div className="container">
          <h3>Question: {this.props.questionNC}</h3>
        </div> 
        <svg width={this.state.svgWidth} height={this.state.svgHeight} ref={this.svgRef}>
          <rect opacity="0.2" width="100%" height="100%" fill="red" />
          {[...Array(this.state.len1).keys()].map(
            (col) =>
              [...Array(this.state.colValHeiS[col]).keys()].map(
                (row) => this.dotReturn(col, row)
              )
          )}
          {[...Array(this.state.len2).keys()].map(
            (col) =>
              [...Array(this.state.colValHeiS2[col]).keys()].map(
                (row) => this.dotReturn2(col, row)
              )
          )}
          <polygon
            points={
              [
                [this.state.triCent1 + this.state.distancing1 - 5, this.state.ceilDist + 35],
                [this.state.triCent1 + this.state.distancing1 + 5, this.state.ceilDist + 35],
                [this.state.triCent1 + this.state.distancing1, this.state.ceilDist + 20]
              ]
            }
            onMouseDown={(e, num) => this.triMouseDown(e, 1)}
          />
          <polygon
            points={
              [
                [this.state.triCent2 + this.state.distancing2 - 5, this.state.ceilDist + 35],
                [this.state.triCent2 + this.state.distancing2 + 5, this.state.ceilDist + 35],
                [this.state.triCent2 + this.state.distancing2, this.state.ceilDist + 20]
              ]
            }
            onMouseDown={(e, num) => this.triMouseDown(e, 2)}
          />
          Sorry, please use a different browser.
        </svg>
        <br />
        <div class="boxed">
          <div class="color-box" style={{ backgroundColor: "DarkCyan" }}></div>
          {this.props.graph1}
          <br />
          <div class="color-box" style={{ backgroundColor: "Crimson" }}></div>
          {this.props.graph2}
        </div>
        <br />
        <h4>Area Under Curve: <span ref={this.areaRef}></span> | First x-coordinate: {this.state.col11} | Second x-coordinate: {this.state.col21} </h4>
        {
          !this.state.submitted && 
          <div>
            <input type="submit" className="btn" value="Ok"
              onClick={this.onSubmit}/> <br/>
            <p style={{ color: "grey" }}>
              Reminder: Once you click "Ok", your response to this question will be 
              recorded, and you won't be able to change your answer. 
            </p>
          </div>
        }
      </div>
    )
  }
}

NormalCurve.propTypes = {
  getExpt: PropTypes.func.isRequired,
  expt: PropTypes.object.isRequired,
  storeAnswer: PropTypes.func.isRequired,
  getItemData: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  expt: state.expt
})

export default connect(
  mapStateToProps,
  { getExpt, storeAnswer, getItemData }
)(NormalCurve);