import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './HistSliderTradeOff.css';

import {
  getExpt,
  storeAnswer
} from "../actions/dataActions";

class TradeoffTwo extends Component {
    constructor() {
        // putting super() here so that we can use this.blahblah
        super();
        this.sliderRef = React.createRef();
        this.slider2Ref = React.createRef();
        this.threeGraphRef = React.createRef();
        this.rectRef = React.createRef();
        this.svgRef = React.createRef();
        this.graphColRef=React.createRef();
        this.refLine1Ref = React.createRef();
        this.refLine2Ref = React.createRef();
  
        this.refLine4Ref = React.createRef();
        this.refLine3Ref = React.createRef();
        this.refLine6Ref = React.createRef();
        this.refLine5Ref = React.createRef();
        this.refLine7Ref = React.createRef();
        this.refLine8Ref = React.createRef();
  
        this.stroke1Ref = React.createRef();
        this.areaRef = React.createRef();
        this.onChange2 = this.onChange2.bind(this);
        this.rectReturn1 = this.rectReturn1.bind(this);
        this.rectReturn2 = this.rectReturn2.bind(this);
        this.rectReturn3 = this.rectReturn3.bind(this);
        this.rectReturn4 = this.rectReturn4.bind(this);
        this.rectReturn5 = this.rectReturn5.bind(this);
        this.rectReturn6 = this.rectReturn6.bind(this);
        this.textReturn1 = this.textReturn1.bind(this);
        this.changeGraphColNumber = this.changeGraphColNumber.bind(this);
        this.line1 = this.line1.bind(this);
        this.changeGraphNumber = this.changeGraphNumber.bind(this);
        this.changeStroke1=this.changeStroke1.bind(this);
  


        this.onChange1 = this.onChange1.bind(this);
  
    
        this.resetState = this.resetState.bind(this);
        //this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.noAnswer = this.noAnswer.bind(this);

  
        this.state = this.initialState;
      }

  
// setting the initial state of this component 
    get initialState() {
        //const data = this.props.data;



        return{
            submitted: false,
            stroke1 : "#FF0000",
            stroke2 : "#0000FF",
            rect1Height : 100,
            rect2Height : 100,
            rect3Height : 100,
            rect4Height: 100,
            rect5Height:100,
            rect6Height:100,
            rect7Height:100,
            rect8Height:100,
            rectWidth : 40,
            sliderPos:1,
            sliderPos2:1,
            rect1Arr: [0.76,0.76, 0.68, 0.65, 0.63, 0.62, 0.60, 0.59, 0.58, 0.57, 0.56, 0.56, 0.55, 0.54, 0.54, 0.53, 0.53, 0.52, 0.52, 0.52, 0.51, 0.51, 0.509 ,0.506, 0.503, 0.50],
            rect2Arr: [0.399528104378295,
            0.419528104378295,
            0.436856783892294,
            0.446993411594998,
            0.454185463406292,
            0.459764052189148,
            0.464322091108996,
            0.468175858104678,
            0.471514142920291,
            0.4744587188117,
            0.477092731703146,
            0.479475486198254,
            0.481650770622995,
            0.483651838314833,
            0.485504537618676,
            0.48722935940585,
            0.48884282243429,
            0.4903584379797,
            0.491787398325699,
            0.493139078857456,
            0.494421411217145,
            0.495641165321381,
            0.496804165712253,
            0.497915459776524,
            0.498979450136994,
            0.5],
            rect3Arr: [0.75,
            0.750612329917804,
            0.751250724134086,
            0.751917500572648,
            0.752615300807172,
            0.753347153269713,
            0.754116552685526,
            0.754927561004581,
            0.75578493721218,
            0.756694306539426,
            0.75766238435649,
            0.758697277428794,
            0.7598088970111,
            0.761009537626203,
            0.762314708281047,
            0.763744360978112,
            0.76532476871298,
            0.767091514247826,
            0.769094485137193,
            0.771406745334602,
            0.774141568686512,
            0.777488721956225,
            0.781803953043001,
            0.787885929664624,
            0.798283137373023,
            0.818283137373023],
            rect4Arr: [0.75,
            0.748775340164392,
            0.747498551731828,
            0.746164998854703,
            0.744769398385657,
            0.743305693460574,
            0.741766894628947,
            0.740144877990839,
            0.73843012557564,
            0.736611386921148,
            0.73467523128702,
            0.732605445142412,
            0.7303822059778,
            0.727980924747594,
            0.725370583437905,
            0.722511278043775,
            0.719350462574041,
            0.715816971504349,
            0.711811029725613,
            0.707186509330796,
            0.701716862626977,
            0.695022556087551,
            0.686392093913997,
            0.674228140670752,
            0.653433725253954,
            0.633433725253954],
            rect5Arr: [0.689038170367751,
            0.677038170367751,
            0.638915075436954,
            0.616614494491005,
            0.600791980506157,
            0.588519085183875,
            0.578491399560208,
            0.570013112169709,
            0.56266888557536,
            0.556190818614259,
            0.550395990253079,
            0.545153930363841,
            0.540368304629411,
            0.535965955707367,
            0.531890017238912,
            0.52809540930713,
            0.524545790644563,
            0.521211436444659,
            0.518067723683462,
            0.515094026513597,
            0.512272895322282,
            0.509589436292963,
            0.507030835433044,
            0.504585988491648,
            0.502245209698614,
            0.5],
            rect6Arr: [0.75,0.750244931967122,
            0.750500289653634,
            0.750767000229059,
            0.751046120322869,
            0.751338861307885,
            0.75164662107421,
            0.751971024401832,
            0.752313974884872,
            0.75267772261577,
            0.753064953742596,
            0.753478910971518,
            0.75392355880444,
            0.754403815050481,
            0.754925883312419,
            0.755497744391245,
            0.756129907485192,
            0.75683660569913,
            0.757637794054877,
            0.758562698133841,
            0.759656627474605,
            0.76099548878249,
            0.762721581217201,
            0.76515437186585,
            0.769313254949209,
            0.781313254949209, 
            ],
            rect7Arr: [0.4,0.8],
            rect8Arr: [0.2,0.3],
            line1Height:0.4,
            line2Height:0.5,
            line3Height:0.4,
            line4Height:0.2,
            line5Height:0.4,
            line6Height:0.3,
            line7Height:0.2,
            line8Height:0.1,
            threeGraphs: false,
            threeGraphOne: true,
            fourGraphOne: true

        }


    };
    
    
    resetState() {
        this.setState(this.initialState);
      }

    // additional setup to communicate with Experiment.js
    componentDidMount() {
      const { childRef } = this.props;
      childRef(this);
      this.getData();
      this.props.setWhichItem("trade-off");
    }
    // additional setup to communicate with Experiment.js
    componentWillUnmount() {
      const { childRef } = this.props;
      childRef(undefined);
   }
  // get experiment data from the database 
    getData() {
        const db = this.props.expt.dbInfo.db;
        const studyName = this.props.expt.dbInfo.col.split("-")[0];
        const exptName = this.props.expt.dbInfo.col.split("-")[1];
        this.props.getExpt(db, studyName, exptName);
    }
    onSubmit() {
        //const threeGraphs = this.state.threeGraphs;
        const questionTO2 = this.props.questionTOKey2;
        const sliderPos2 = this.state.sliderPos2;
        

        this.props.storeAnswer( questionTO2,sliderPos2);
        //this.props.storeAnswer(question, answer);
        this.setState({ submitted: true });
      }
    noAnswer() {
        const questionTO2 = this.props.questionTOKey2;
        const sliderPos2 = "Prefer Not to Answer";
        this.props.storeAnswer(questionTO2,sliderPos2);
        this.setState({ submitted: true });
    }
    changeGraphColNumber(){
        const newColor = this.graphColRef.current.value;
        if (newColor === "1 and 1"){
            this.setState({fourGraphOne: true});
            this.setState({threeGraphOne: true});
        }
        if (newColor === "1 and 2"){
            this.setState({fourGraphOne: true});
            this.setState({threeGraphOne: false});
        }
        if (newColor === "2 and 1"){
            this.setState({fourGraphOne: false});
            this.setState({threeGraphOne: true});
        }
        if (newColor === "2 and 2"){
            this.setState({fourGraphOne: false});
            this.setState({threeGraphOne: false});
        }
    }
      onChange1(e){
          this.setState({ [e.target.name]: e.target.value })
          this.setState({rect1Height :200*this.state.rect1Arr[e.target.value]})
          this.setState({rect2Height :200*this.state.rect2Arr[e.target.value]})
          this.setState({rect3Height :200*this.state.rect3Arr[e.target.value]})
          this.setState({rect4Height :200*this.state.rect4Arr[e.target.value]})
          this.setState({rect5Height :200*this.state.rect5Arr[e.target.value]})
          this.setState({rect6Height :200*this.state.rect6Arr[e.target.value]})
          this.setState({rect7Height :200*this.state.rect7Arr[e.target.value]})
          this.setState({rect8Height :200*this.state.rect8Arr[e.target.value]})
      }
      onChange10(e){
        this.setState({line1Height:e})
      }
      onChange2(e){
        this.setState({line2Height:e})
      }
      onChange3(e){
        this.setState({line3Height:e})
      }
      onChange4(e){
        this.setState({line4Height:e})
      }
      onChange5(e){
        this.setState({line5Height:e})
      }
      onChange6(e){
        this.setState({line6Height:e})
      }
      onChange7(e){
        this.setState({line7Height:e})
      }
      onChange8(e){
        this.setState({line8Height:e})
      }
  
      changeStroke1() {
        const newColor = this.stroke1Ref.current.value;
        if (newColor === "#FF0000"){
          this.setState({stroke1:"#0000FF"});
          this.setState({stroke2:newColor});
        }
        if (newColor === "#0000FF"){      
          this.setState({stroke1: "#FF0000"});
          this.setState({stroke2:newColor});
        }
        if(newColor === "Orange and Blue"){
          this.setState({stroke1:"#0000FF"});
          this.setState({stroke2: "#ffa500"});
        }
        if(newColor === "Blue and Orange"){
          this.setState({stroke1:"#0000FF"});
          this.setState({stroke2: "#ffa500"});
        }
        if(newColor === "Blue and Yellow"){
          this.setState({stroke1:"#0000FF"});
          this.setState({stroke2: "#FFD300"});
        }
        if(newColor === "Yellow and Blue"){
          this.setState({stroke1:"#0000FF"});
          this.setState({stroke2: "#FFD300"});
        }
  
  
      }
      changeGraphNumber(){
        const newGraph = this.threeGraphRef.current.value;
        if (newGraph === "True"){
          this.setState({threeGraphs: true});
        }
        else{
          this.setState({threeGraphs: false});
        }
    }
  
      rectReturn1(xPos, yPos){
          var hard = 
          <rect
          x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke1} height = {this.state.rect1Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
          return hard;
        }
        rectReturn2(xPos, yPos){
          var hard = 
          <rect
          x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke2} height = {this.state.rect2Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
          return hard;
        }
        rectReturn3(xPos, yPos){
          var hard = 
          <rect
          x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke1} height = {this.state.rect3Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
          return hard;
        }
        rectReturn4(xPos, yPos){
          var hard = 
          <rect
          x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke2} height = {this.state.rect4Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
          return hard;
        }
        rectReturn5(xPos, yPos){
          var hard = 
          <rect
          x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke1} height = {this.state.rect5Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
          return hard;
        }
        rectReturn6(xPos, yPos){
          var hard = 
          <rect
          x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke2} height = {this.state.rect6Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
          return hard;
        }
        rectReturn7(xPos, yPos){
          var hard = 
          <rect
          x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke1} height = {this.state.rect7Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
          return hard;
        }
        rectReturn8(xPos, yPos){
          var hard = 
          <rect
          x = {xPos} y = {yPos} stroke = {"#000000"} fill = {this.state.stroke2} height = {this.state.rect8Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
          return hard;
        }
        rectReturn9(xPos, yPos){
          var hard = 
          <rect
          x = {xPos} y = {yPos} stroke = {"#000000"} fill = {"#ffa500"} height = {this.state.rect5Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
          return hard;
        }
        rectReturn10(xPos, yPos){
          var hard = 
          <rect
          x = {xPos} y = {yPos} stroke = {"#000000"} fill = {"#ffa500"} height = {this.state.rect6Height} width = {this.state.rectWidth} fillOpacity = "0.7" strokeOpacity = "0.7"></rect>;
          return hard;
        }
        line1(xPos1,xPos2,yPos1,yPos2){
          var hard = 
          <line x1 = {xPos1 + 300} x2 = {300 + xPos2} y1 = {yPos1} y2 = {yPos2} stroke = "#000000"></line>;
          return hard;
        }
        line2(xPos1,xPos2,yPos1,yPos2){
          var hard = 
          <line x1 = {xPos1 + 300} x2 = {300 + xPos2} y1 = {yPos1} y2 = {yPos2} stroke = "#808080"></line>;
          return hard;
        }
        textReturn1(xPos, yPos, tedxt){
          var hard = <text x = {xPos} y = {yPos}>{tedxt}</text>;
          return hard;
        }
  
    showTradeOff(){
        const threeGraphs = this.state.threeGraphs;
        return(
            
            <div>
        <div className="container">
          <h3>Question: </h3>
          <div style={{ width: "60%", margin: "auto" }}>
            <p style={{ textAlign: "left" }}>
              {this.props.questionTO2}
            </p>
          </div>
        </div> 
            <svg width = {1400} height = {1000} style={{}} class = "b"> 
                {this.rectReturn1(500,450)}
                {this.rectReturn2(580,450)}
                {this.rectReturn3(900,450)}
                {this.rectReturn4(980,450)}
                {this.line1(173,187,650,650)}
                {this.line1(173,187,488,488)}
                {this.line1(173,187,528,528)}
                {this.line1(173,187,568,568)}
                {this.line1(173,187,608,608)}

                {this.line1(176,184,633,633)}
                {this.line1(176,184,468,468)}
                {this.line1(176,184,508,508)}
                {this.line1(176,184,548,548)}
                {this.line1(176,184,588,588)}
                {this.line1(173,187,488,488)}
                {this.line1(173,187,528,528)}
                {this.line1(173,187,568,568)}
                {this.line1(173,187,608,608)}

                {this.line1(176,184,633,633)}
                {this.line1(176,184,468,468)}
                {this.line1(176,184,508,508)}
                {this.line1(176,184,548,548)}
                {this.line1(176,184,588,588)}

                {
                threeGraphs
                ? this.line1(330,330,160,360)


                : this.line1(576,584,218,218)
              }
              {
                threeGraphs
                ? this.line1(330,330,258,258)


                : this.line1(576,584,298,298)
              }
              {
                threeGraphs
                ? this.line1(326,334,298,298)


                : this.line1(576,584,337,337)
              }
              {
                threeGraphs
                ? this.line1(326,334,338,338)


                : this.line1(573,587,360,360)
              }

              {
                threeGraphs
                ? this.line1(326,334,218,218)


                : this.line1(176,184,218,218)
              }
              
              {
                threeGraphs
                ? this.line1(326,334,258,258)


                : this.line1(176,184,258,258)
              }

              {
                threeGraphs
                ? this.line1(326,334,178,178)


                : this.line1(576,584,258,258)
              }




              {
                threeGraphs
                ? this.line1(330,330,160,360)


                : this.line1(573,587,198,198)
              }
              {
                threeGraphs
                ? this.line1(323,337,238,238)


                : this.line1(573,587,238,238)
              }
              {
                threeGraphs
                ? this.line1(323,337,278,278)


                : this.line1(573,587,278,278)
              }
              {
                threeGraphs
                ? this.line1(323,337,318,318)


                : this.line1(573,587,318,318)
              }

              {
                threeGraphs
                ? this.line1(323,337,360,360)


                : this.line1(176,184,218,218)
              }


               {
                threeGraphs
                ? this.line1(323,337,198,198)


                : this.line1(173,187,198,198)
              }
              {
                threeGraphs
                ? this.line1(330,330,258,258)


                : this.line1(173,187,238,238)
              }
              {
                threeGraphs
                ? this.line1(330,330,160,360)


                : this.line1(173,187,278,278)
              }
              {
                threeGraphs
                ? this.line1(330,330,160,360)


                : this.line1(173,187,318,318)
              }

              {
                threeGraphs
                ? this.line1(330,330,160,360)


                : this.line1(176,184,218,218)
              }











              {
                threeGraphs
                ? this.line1(330,330,255,258)


                : this.line1(176,184,298,298)
              }
              {
                threeGraphs
                ? this.line1(330,330,160,360)


                : this.line1(176,184,337,337)
              }
              {
                threeGraphs
                ? this.line1(330,330,160,360)


                : this.line1(173,187,360,360)
              }


              {
                threeGraphs
                ? this.line1(330,330,160,360)


                : this.line1(576,584,218,218)
              }
                                {
                threeGraphs
                ? this.line1(330,330,160,360)


                : this.line1(576,584,178,178)

              }
                                {
                threeGraphs
                ? this.line1(330,330,160,360)


                : this.line1(176,184,178,178)
              }

                {this.line1(573,587,650,650)}
                {this.line1(573,587,488,488)}
                {this.line1(573,587,528,528)}
                {this.line1(573,587,568,568)}
                {this.line1(573,587,608,608)}

                {this.line1(576,584,633,633)}
                {this.line1(576,584,468,468)}
                {this.line1(576,584,508,508)}
                {this.line1(576,584,548,548)}
                {this.line1(576,584,588,588)}


                {
                  this.state.threeGraphs
                  ? this.rectReturn5(660,160)             
                  : [
                      (this.state.threeGraphOne
                      ? this.rectReturn9(535,160)
                      : this.rectReturn5(500,160)
                      )
                    ]
                }
                {
                  this.state.threeGraphs
                  ? this.rectReturn6(735,160)         
                  : [
                    (this.state.threeGraphOne
                    ? <text></text>
                    : this.rectReturn6(580,160)
                    )
                  ]     
                }
                {
                  this.state.threeGraphs
                  ? <text> </text>        
                  : [
                      (this.state.fourGraphOne
                      ? this.rectReturn10(940,160)  
                      : this.rectReturn7(900,160)   
                      )
                  ] 
                }
               {
                  this.state.threeGraphs
                  ? <text> </text>        
                  : [
                      (this.state.fourGraphOne
                      ? <text></text>
                      : this.rectReturn8(980,160)   
                      )
                  ] 
                }
                {this.line1(180,180,450,650)}
                {this.line1(180,360,450,450)}
                {this.line1(580,580,450,650)}
                {this.line1(580,760,450,450)}
                {
                threeGraphs
                ? this.line1(330,330,160,360)


                : this.line1(180,180,160,360)

              }
            
              {
                threeGraphs
                ? this.line1(330,510,160,160)

                : this.line1(180,390,160,160)
              }
              {
                threeGraphs
                ? this.line1(0,0,0,0)


                : this.line1(580,580,160,360)

              }
              {
                threeGraphs
                ? this.line1(0,0,0,0)

                : this.line1(580 ,780,160,160)
              }
              </svg>
              <svg class = "e" width = {1400} height = {1000}>
              <text x = {200} y = {115}>Put the slider at a position where False Positive Rate for Black and White People is Equal</text>
              <text x = {230} y = {265}>Legend:</text>
              <text x = {305} y = {265}> White People</text>
              <rect x = {290} y = {255} height = {10} width = {10} stroke = {this.state.stroke1} fill = {this.state.stroke1}></rect>
              <text x = {415} y = {265}> Black People</text>
              <rect x = {510} y = {255} height = {10} width = {10} stroke = {"#ffa500"} fill = {"#ffa500"}></rect>
              <text x = {525} y = {265}>Both Groups</text>
              <rect x = {400} y = {255} height = {10} width = {10} stroke = {this.state.stroke2} fill = {this.state.stroke2}></rect>

              <text x = {150} y = {200}>Equal FPR</text>
              <text x = {450} y = {200}>Equal Accuracy</text>
              <text x = {55} y = {510}>0</text>
              <text x = {50} y = {470}>20</text>
              <text x = {50} y = {430}>40</text>
              <text x = {50} y = {390}>60</text>
              <text x = {50} y = {350}>80</text>
              <text x = {45} y = {310}>100</text>
              <text x = {450} y = {510}>0</text>
              <text x = {445} y = {470}>20</text>
              <text x = {445} y = {430}>40</text>
              <text x = {445} y = {390}>60</text>
              <text x = {445} y = {350}>80</text>
              <text style = {{size:8}} x = {440} y = {310}>100</text>
              {
                threeGraphs
                ? <text x = {185} y = {600}>100</text>

                : <text x = {45} y = {600}>100</text>
              }
              {
                threeGraphs
                ? <text x = {190} y = {640}>80</text>

                : <text x = {50} y = {640}>80</text>
              }
              {
                threeGraphs
                ? <text x = {190} y = {680}>60</text>

                : <text x = {50} y = {680}>60</text>
              }
              {
                threeGraphs
                ? <text x = {190} y = {720}>40</text>

                : <text x = {50} y = {720}>40</text>
              }
              {
                threeGraphs
                ? <text x = {190} y = {760}>20</text>

                : <text x = {50} y = {760}>20</text>
              }
              {
                threeGraphs
                ? <text x = {190} y = {790}>0</text>
                : <text x = {50} y = {800}>0</text>
              }
              {
                threeGraphs
                ? <text x = {190} y = {790}> </text>
                : <text x = {445} y = {600}>100</text>
              }
               {
                threeGraphs
                ? <text x = {190} y = {640}></text>

                : <text x = {452} y = {640}>80</text>
              }
              {
                threeGraphs
                ? <text x = {190} y = {680}></text>

                : <text x = {452} y = {680}>60</text>
              }
              {
                threeGraphs
                ? <text x = {190} y = {720}></text>

                : <text x = {452} y = {720}>40</text>
              }
              {
                threeGraphs
                ? <text x = {190} y = {760}></text>

                : <text x = {452} y = {760}>20</text>
              }
              {
                threeGraphs
                ? <text x = {160} y = {790}> </text>
                : <text x = {460} y = {800}>0</text>
              }
              <text x = {200} y = {310}>Accuracy Rate</text>
              <text x = {625} y = {310}>False Positive Rate</text>
              {
                threeGraphs
                ? <text x = {380} y = {610}>Graph 3</text>
                : <text x = {200} y = {610}></text>
              }
              {
                threeGraphs
                ? <text> </text>
                : <text x = {625} y = {610}></text>
              }
              <text x = {200} y = {310}></text>
              <text x = {625} y = {310}></text>
              {
                threeGraphs
                ? <text x = {380} y = {610}>Graph 3</text>
                : <text x = {200} y = {610}>Total Accuracy Rate</text>
              }
              {
                threeGraphs
                ? <text> </text>
                : <text x = {625} y = {610}>Total False Positive Rate</text>
              }

            </svg>

            <input type="range" min={0} max={(this.state.rect1Arr.length)-1} 
          className="tradeoff-slider" onChange={this.onChange1}
          name="sliderPos2" value={this.state.sliderPos2} ref={this.sliderRef} list = "tickmarks"
          style={{ width:300, left:880, top:700}}/>

            </div>
        )
    }


    render() {
        return (

        <div>
         {this.showTradeOff()} <br/>
        <span style={{ color: "white" }} ref={this.sliderRef}></span>
        {
          !this.state.submitted && 
          <div>
            <input type="submit" className="extraPadding" value="I Confirm My Answer"
              onClick={this.onSubmit}/> <br/>
            <p style={{ color: "grey", width: "40%", margin: "auto" }}>
              Reminder: Once you click "I Confirm My Answer", your response to this question 
              will be recorded, and you won't be able to change your answer. 
            </p> <br/>
            <input type="submit" className="btn" value="I Prefer Not to Answer"
              onClick={this.noAnswer}/>
          </div>
        }
                
            </div>
        )
    }
}







// Listing required functions / data
TradeoffTwo.propTypes = {
    getExpt: PropTypes.func.isRequired,
    expt: PropTypes.object.isRequired,
    storeAnswer: PropTypes.func.isRequired
  }

// mapping Redux state to props that we can use in our component
// expt contains all info from a given experiment 
const mapStateToProps = state => ({
   expt: state.expt
 })

export default connect(
   mapStateToProps,
   { getExpt, storeAnswer }
 )(TradeoffTwo); 

/*
class TradeOff extends Component {
    constructor() {
      // putting super() here so that we can use this.blahblah
      super();
      this.sliderRef = React.createRef();
      this.slider2Ref = React.createRef();
      this.threeGraphRef = React.createRef();
      this.rectRef = React.createRef();
      this.svgRef = React.createRef();
      this.graphColRef=React.createRef();
      this.refLine1Ref = React.createRef();
      this.refLine2Ref = React.createRef();
      this.refLine4Ref = React.createRef();
      this.refLine3Ref = React.createRef();
      this.refLine6Ref = React.createRef();
      this.refLine5Ref = React.createRef();
      this.refLine7Ref = React.createRef();
      this.refLine8Ref = React.createRef();
      this.stroke1Ref = React.createRef();
      this.areaRef = React.createRef();
      this.onChange2 = this.onChange2.bind(this);
      this.rectReturn1 = this.rectReturn1.bind(this);
      this.rectReturn2 = this.rectReturn2.bind(this);
      this.rectReturn3 = this.rectReturn3.bind(this);
      this.rectReturn4 = this.rectReturn4.bind(this);
      this.rectReturn5 = this.rectReturn5.bind(this);
      this.rectReturn6 = this.rectReturn6.bind(this);
      this.textReturn1 = this.textReturn1.bind(this);
      this.changeGraphColNumber = this.changeGraphColNumber.bind(this);
      this.line1 = this.line1.bind(this);
      this.changeGraphNumber = this.changeGraphNumber.bind(this);
      this.changeStroke1=this.changeStroke1.bind(this);
      this.establishStateData = this.establishStateData.bind(this);
      this.state = this.establishStateData(this.props.data);
      this.onChange1 = this.onChange1.bind(this);
  
      this.resetState = this.resetState.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.showSlider = this.showSlider.bind(this);
      this.state = this.initialState;
    }
  
// setting the initial state of this component 
get initialState() {
    const data = this.props.data;
    return{
        stroke1 : "#FF0000",
        stroke2 : "#0000FF",
        rect1Height : 100,
        rect2Height : 100,
        rect3Height : 100,
        rect4Height: 100,
        rect5Height:100,
        rect6Height:100,
        rect7Height:100,
        rect8Height:100,
        rectWidth : 40,
        sliderPos:1,
        sliderPos2:1,
        rect1Arr: [0.76,0.76, 0.68, 0.65, 0.63, 0.62, 0.60, 0.59, 0.58, 0.57, 0.56, 0.56, 0.55, 0.54, 0.54, 0.53, 0.53, 0.52, 0.52, 0.52, 0.51, 0.51, 0.509 ,0.506, 0.503, 0.50],
        rect2Arr: [0.399528104378295,
          0.419528104378295,
          0.436856783892294,
          0.446993411594998,
          0.454185463406292,
          0.459764052189148,
          0.464322091108996,
          0.468175858104678,
          0.471514142920291,
          0.4744587188117,
          0.477092731703146,
          0.479475486198254,
          0.481650770622995,
          0.483651838314833,
          0.485504537618676,
          0.48722935940585,
          0.48884282243429,
          0.4903584379797,
          0.491787398325699,
          0.493139078857456,
          0.494421411217145,
          0.495641165321381,
          0.496804165712253,
          0.497915459776524,
          0.498979450136994,
          0.5],
        rect3Arr: [0.75,
          0.750612329917804,
          0.751250724134086,
          0.751917500572648,
          0.752615300807172,
          0.753347153269713,
          0.754116552685526,
          0.754927561004581,
          0.75578493721218,
          0.756694306539426,
          0.75766238435649,
          0.758697277428794,
          0.7598088970111,
          0.761009537626203,
          0.762314708281047,
          0.763744360978112,
          0.76532476871298,
          0.767091514247826,
          0.769094485137193,
          0.771406745334602,
          0.774141568686512,
          0.777488721956225,
          0.781803953043001,
          0.787885929664624,
          0.798283137373023,
          0.818283137373023],
        rect4Arr: [0.75,
          0.748775340164392,
          0.747498551731828,
          0.746164998854703,
          0.744769398385657,
          0.743305693460574,
          0.741766894628947,
          0.740144877990839,
          0.73843012557564,
          0.736611386921148,
          0.73467523128702,
          0.732605445142412,
          0.7303822059778,
          0.727980924747594,
          0.725370583437905,
          0.722511278043775,
          0.719350462574041,
          0.715816971504349,
          0.711811029725613,
          0.707186509330796,
          0.701716862626977,
          0.695022556087551,
          0.686392093913997,
          0.674228140670752,
          0.653433725253954,
          0.633433725253954],
        rect5Arr: [0.689038170367751,
          0.677038170367751,
          0.638915075436954,
          0.616614494491005,
          0.600791980506157,
          0.588519085183875,
          0.578491399560208,
          0.570013112169709,
          0.56266888557536,
          0.556190818614259,
          0.550395990253079,
          0.545153930363841,
          0.540368304629411,
          0.535965955707367,
          0.531890017238912,
          0.52809540930713,
          0.524545790644563,
          0.521211436444659,
          0.518067723683462,
          0.515094026513597,
          0.512272895322282,
          0.509589436292963,
          0.507030835433044,
          0.504585988491648,
          0.502245209698614,
          0.5],
        rect6Arr: [0.75,0.750244931967122,
          0.750500289653634,
          0.750767000229059,
          0.751046120322869,
          0.751338861307885,
          0.75164662107421,
          0.751971024401832,
          0.752313974884872,
          0.75267772261577,
          0.753064953742596,
          0.753478910971518,
          0.75392355880444,
          0.754403815050481,
          0.754925883312419,
          0.755497744391245,
          0.756129907485192,
          0.75683660569913,
          0.757637794054877,
          0.758562698133841,
          0.759656627474605,
          0.76099548878249,
          0.762721581217201,
          0.76515437186585,
          0.769313254949209,
          0.781313254949209, 
          ],
        rect7Arr: [0.4,0.8],
        rect8Arr: [0.2,0.3],
        line1Height:0.4,
        line2Height:0.5,
        line3Height:0.4,
        line4Height:0.2,
        line5Height:0.4,
        line6Height:0.3,
        line7Height:0.2,
        line8Height:0.1,
        threeGraphs: false,
        threeGraphOne: true,
        fourGraphOne: true
    }
    };
  
  resetState() {
    this.setState(this.initialState);
  }
    // additional setup to communicate with Experiment.js
  componentDidMount() {
    const { childRef } = this.props;
    childRef(this);
    this.getData();
    this.props.setWhichItem("trade-off");
  }
  // additional setup to communicate with Experiment.js
  componentWillUnmount() {
    const { childRef } = this.props;
    childRef(undefined);
  }
  // get experiment data from the database 
  getData() {
    const db = this.props.expt.dbInfo.db;
    const studyName = this.props.expt.dbInfo.col.split("-")[0];
    const exptName = this.props.expt.dbInfo.col.split("-")[1];
    this.props.getExpt(db, studyName, exptName);
  }
// Listing required functions / data
TradeOff.propTypes = {
    getExpt: PropTypes.func.isRequired,
    expt: PropTypes.object.isRequired,
    storeAnswer: PropTypes.func.isRequired
  }
// mapping Redux state to props that we can use in our component
// expt contains all info from a given experiment 
const mapStateToProps = state => ({
   expt: state.expt
 })
export default connect(
   mapStateToProps,
   { getExpt, storeAnswer }
 )(TradeOff); 
*/
