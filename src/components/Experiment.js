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
import TradeOff from "../items/TradeOff";
import TradeOffThree from "../items/TradeOffThree";
import TradeOffTwo from "../items/TradeOffTwo";
import StaticText from "../items/StaticText";
// import NormalCurve from "../items/NormalCurve.jsx";
import NormalCurveSurvey from "../items/NormalCurveSurvey";
import Histogram from "../items/Histogram";

/**
 * This component displays an experiment question
 */
class Experiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichItem: ""
    }

    this.onNextQuestion = this.onNextQuestion.bind(this);
    this.onFinalSubmit = this.onFinalSubmit.bind(this);
    this.whichSubmit = this.whichSubmit.bind(this);
    this.setWhichItem = this.setWhichItem.bind(this);
  }

  componentDidMount() {
    this.getData();
    const username = this.props.match.params.username;
    const expt = this.props.match.params.expt;
    // if the store doesn't have participant ID, we ask participants to 
    // re-enter their ID 
    // (this happens if users close the tab then open it again or refresh)
    if (!this.props.expt.participantID) {
      alert("Please enter your unique ID");
      this.props.history.push("/expt/" + username + "/" + expt);
    }
  }

  // method to push user to the next question 
  // similar to an iterator
  nextQuestion() {
    const username = this.props.match.params.username;
    const expt = this.props.match.params.expt;
    const nextQ = this.props.expt.questionKeys[this.props.expt.numQ + 1];
    const lastQ = this.props.expt.questionKeys[this.props.expt.questionKeys.length - 1];
    // decide if the next question is the final question
    if (nextQ == lastQ) {
      this.props.isFinalQ(true);
    }
    this.props.setNumQ(this.props.expt.numQ + 1);
    this.props.history.push("/expt/" + username + "/" + expt + 
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
    if (this.childTradeOff) {
      this.childTradeOff.resetState();
      this.nextQuestion();
    }; 
    if (this.childTradeOffTwo) {
      this.childTradeOffTwo.resetState();
      this.nextQuestion();
    }; 
    if (this.childTradeOffThree) {
      this.childTradeOffThree.resetState();
      this.nextQuestion();
    }; 
    if (this.childStaticText) {
      this.nextQuestion();
    };
  }

  // will be triggered when the next question is the final question 
  onFinalSubmit() {
    this.props.history.push("/success");
  }

  // decides which button to show for the next question based whether the next
  // question is the final question of the experiment
  whichSubmit() {
    return (
      <div>
        {
          !this.props.expt.isFinalQ ? 
          <div>
            {/* Please click "I Confirm My Answer" above before clicking "Next Question" <br/><br/> */}
            <input type="submit" className="extraPadding" value="Next Question"
              onClick={this.onNextQuestion}/> 
            <br/><br/><br/><br/><br/><br/>
          </div> :
          <div>
            {
              this.state.whichItem == "static-text"
              ?
              <></>
              :
              <div>
                Please click "I Confirm My Answer" above before clicking "Submit" <br/><br/>
              </div>
            }
            <div>
                This is the final page. <p></p>
                <input type="submit" className="extraPadding" value="Submit"
                  onClick={this.onFinalSubmit}/>
                <div>
                  <br/><br/><br/><br/><br/><br/>
                </div>
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

  /**
   * Set the whichItem field of setState. 
   * This function is used by all experiment items to let Experiment.js know
   * which item is currently on display.
   * @param {String} itemName Name of the item that's currently on display
   */
  setWhichItem(itemName) {
    this.setState({ whichItem: itemName });
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
          // this.setState({ whichItem: "slider" });
          const lowRange = expt[key]["lowRange"];
          const highRange = expt[key]["highRange"];
          const question = expt[key]["Question"];
          const sliderCSVKey = expt[key]["slider-key"];
          return (
            <div className="container">
              <Slider childRef={ref => (this.childSlider = ref)}
                question={question} sliderCSVKey={sliderCSVKey}
                lowRange={lowRange} highRange={highRange} setWhichItem={this.setWhichItem}/>
              <br/>
              {/* keep the following line */}
              <this.whichSubmit />
            </div>
          )
          case "tradeoff":
            // this.setState({ whichItem: "tradeoff" });
            const questionTO = expt[key]["QuestionTO"];
           // const tradeOff1legend = expt[key]["trade-off-legend-key"];
            const sliderPositionTO = expt[key]["sliderPositionTO"];

            //const sliderPos =expt[key]["sliderPos"]; 
    
            return (
              <div className="container">
              <TradeOff childRef={ref => (this.childTradeOff = ref)}
                 questionTO={questionTO} 
                 sliderPositionTO={sliderPositionTO}
                  setWhichItem={this.setWhichItem}/>
                <br/>
                <this.whichSubmit />
              </div>
            )          
            case "tradeofftwo":
              // this.setState({ whichItem: "tradeoff" });
              const questionTO2 = expt[key]["QuestionTO2"];

  
  
              const sliderPos2 =expt[key]["sliderPos2"]; 
      
              return (
                <div className="container">
                <TradeOffTwo childRef={ref => (this.childTradeOffTwo = ref)}
                   questionTO2={questionTO2} 
                   sliderPos2={sliderPos2} setWhichItem={this.setWhichItem}/>
                  <br/>
                  <this.whichSubmit />
                </div>
              )          

              case "tradeoffthree":
                // this.setState({ whichItem: "tradeoff" });
                const questionTO3 = expt[key]["QuestionTO3"];
    
    
                const sliderPos3 =expt[key]["sliderPos3"]; 
        
                return (
                  <div className="container">
                  <TradeOffThree childRef={ref => (this.childTradeOffThree = ref)}
                     questionTO3={questionTO3}
                     sliderPos3={sliderPos3} setWhichItem={this.setWhichItem}/>
                    <br/>
                    <this.whichSubmit />
                  </div>
                )          
            
        case "static-text":
          // this.setState({ whichItem: "static-text" });
          const text = expt[key]["Static Text"];
          var imageURLs = [];
          if (Object.keys(expt[key]).includes("Images")) {
            imageURLs = expt[key]["Images"];
          }
          return (
            <div className="container">
              <StaticText childRef={ref => (this.childStaticText = ref)}
                text={text} imageURLs={imageURLs} setWhichItem={this.setWhichItem}/>
              <br/>
              <this.whichSubmit />
            </div>
          )
        case "normal-curve":
          // this.setState({ whichItem: "normal-curve" });
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
                fileName={dataFileName} data={dataFileContent} 
                setWhichItem={this.setWhichItem}/>
              <br/>
              <this.whichSubmit />
            </div>
          )
        case "threshold":
          // this.setState({ whichItem: "threshold" });
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
                histHighRange={histHighRange} histData={histFileContent} 
                setWhichItem={this.setWhichItem}/>
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
