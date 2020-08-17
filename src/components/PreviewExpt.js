import React, { Component } from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { 
  getExpt,
  sendExpt,
  setNumQ,
  isFinalQ
} from "../actions/dataActions";

import Slider from "../items/Slider";
import StaticText from "../items/StaticText";
import NormalCurve from "../items/NormalCurve.jsx";
import NormalCurveSurvey from "../items/NormalCurveSurvey";
import Histogram from "../items/Histogram";

class Experiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichItem: ""
    }

    this.onNextQuestion = this.onNextQuestion.bind(this);
    this.onFinalSubmit = this.onFinalSubmit.bind(this);
    this.whichSubmit = this.whichSubmit.bind(this);
  }

  componentDidMount() {
    this.getData();
    const username = this.props.match.params.username;
    const expt = this.props.match.params.expt;
    if (!this.props.expt.participantID) {
      alert("Please enter your unique ID");
      this.props.history.push("/preview/" + username + "/" + expt);
    }
  }

  // method to push user to the next question 
  nextQuestion() {
    const username = this.props.match.params.username;
    const expt = this.props.match.params.expt;
    const nextQ = this.props.expt.questionKeys[this.props.expt.numQ + 1];
    const lastQ = this.props.expt.questionKeys[this.props.expt.questionKeys.length - 1];
    if (nextQ == lastQ) {
      this.props.isFinalQ(true);
    }
    this.props.setNumQ(this.props.expt.numQ + 1);
    this.props.history.push("/preview/" + username + "/" + expt + 
      "/" + nextQ.toString());
  }

  // will be triggered when the next question is not the final question
  onNextQuestion() {
    // ###TODO###: add more if statements below that follow the templates 
    if (this.childSlider) {
      this.childSlider.resetState();
      this.nextQuestion();
    };
    if (this.childNormalCurve) {
      this.childNormalCurve.resetState();
      this.nextQuestion();
    }; 
    if (this.childStaticText) {
      this.nextQuestion();
    };
  }

  // will be triggered when the next question is the final question 
  onFinalSubmit() {
    this.props.history.push("/previewSuccess");
  }

  // decides which button to show for the next question based whether the next
  // question is the final question of the experiment
  whichSubmit() {
    return (
      <div>
        {
          !this.props.expt.isFinalQ ? 
          <div>
            Please click "OK" above before clicking "Next Question" <br/><br/>
            <input type="submit" className="btn" value="Next Question"
              onClick={this.onNextQuestion}/>
          </div> :
          <div>
            Please click "OK" above before clicking "Submit" <br/><br/>
            This is the final question. <p></p>
            <input type="submit" className="btn" value="Submit"
              onClick={this.onFinalSubmit}/>
            <div>
              <br/><br/><br/>
            </div>
          </div>
        }
      </div>
    )
  }

  getData() {
    const username = this.props.match.params.username;
    // there will be problems if user's study name / experiment name inclues "-"
    const studyName = this.props.match.params.expt.split("-")[0];
    const exptName = this.props.match.params.expt.split("-")[1];
    this.props.getExpt(username, studyName, exptName);
  }

  displayExpt() {
    const username = this.props.match.params.username;
    const expt = this.props.expt.exptToDisplay;
    const key = this.props.match.params.qKey;
    if (expt[key]) {
      // ###TODO### add more if statements here for your experiment type
      // follow the following format
      // ATTENTION: do NOT call methods (especially those associated with API)
      // inside these cases. React keeps rendering displayExpt(), which means
      // your method(s) will be called repeatedly => not good. 
      switch(expt[key]["Type"]) {
        case "slider":
          const lowRange = expt[key]["lowRange"];
          const highRange = expt[key]["highRange"];
          const question = expt[key]["Question"];
          const sliderCSVKey = expt[key]["slider-key"];
          return (
            <div className="container">
              <Slider childRef={ref => (this.childSlider = ref)}
                question={question} sliderCSVKey={sliderCSVKey}
                lowRange={lowRange} highRange={highRange} />
              <br/>
              {/* keep the following line */}
              <this.whichSubmit />
            </div>
          )
          break;
        case "static-text":
          const text = expt[key]["Static Text"];
          return (
            <div className="container">
              <StaticText childRef={ref => (this.childStaticText = ref)}
                text={text}/>
              <br/>
              <this.whichSubmit />
            </div>
          )
        case "normal-curve":
          const questionNC = expt[key]["Question"];
          const graph1 = expt[key]["graph1key"];
          const graph2 = expt[key]["graph2key"];
          const questionNCKey = expt[key]["normal-curve-question-key"];
          const graph1legend = expt[key]["normal-curve-legend-key1"];
          const graph2legend = expt[key]["normal-curve-legend-key2"];
          const dataFileName = expt[key]["FileName"];
          const dataFileContent = expt[key]["FileContent"];
          return (
            <div className="container">
              <NormalCurveSurvey childRef={ref => (this.childNormalCurve = ref)} 
                questionNC={questionNC} graph1={graph1} graph2={graph2} 
                questionNCKey={questionNCKey} 
                graph1legend={graph1legend}
                graph2legend={graph2legend}
                fileName={dataFileName} data={dataFileContent} />
              <br/>
              <this.whichSubmit />
            </div>
          )
        case "threshold":
          const questionHist = expt[key]["Question"];
          const questionHistKey = expt[key]["threshold-key"];
          const histLowRange = expt[key]["lowRange"];
          const histHighRange = expt[key]["highRange"];
          const histFileContent = expt[key]["FileContent"];
          return (
            <div className="container">
              <Histogram childRef={ref => (this.childHistogram = ref)} 
                questionHist={questionHist} 
                questionHistKey={questionHistKey}
                histLowRange={histLowRange}
                histHighRange={histHighRange} histData={histFileContent} />
              <br/>
              <this.whichSubmit />
            </div>
          )
        default: 
          return (<div>Unknown Experiment Type</div>)
      }
    }
  }


  render() {
    const exptName = this.props.match.params.expt;
    const participant = this.props.expt.participantID;
    return (
      <div className="container">
      Experiment name: <br/>
      <b>{exptName}</b>
      <br/>
      Participant ID: <br/>
      <b>{participant}</b>
      <br/><br/>
      {this.displayExpt()}
    </div>
    )
  }
}

Experiment.propTypes = {
  getExpt: PropTypes.func.isRequired,
  expt: PropTypes.object.isRequired,
  participantID: PropTypes.string.isRequired,
  sendExpt: PropTypes.func.isRequired,
  setNumQ: PropTypes.func.isRequired,
  isFinalQ: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  expt: state.expt,
  participantID: state.participantID
})

export default connect(
  mapStateToProps,
  { getExpt, sendExpt, setNumQ, isFinalQ }
)(Experiment);
