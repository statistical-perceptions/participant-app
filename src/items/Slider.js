import React, { Component } from 'react';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
      lowRange: this.props.lowRange,
      highRange: this.props.highRange,
      value: 0,
    }

    this.onChange = this.onChange.bind(this);
    this.showSlider = this.showSlider.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  showSlider() {
    return (
      <div className="container">
        {this.state.question} <br/>
        <input 
          type="range"
          min={this.state.lowRange}
          max={this.state.highRange}
          name="value"
          value={this.state.value}
          onChange={this.onChange}
        />
        {this.state.value} <br/>
        <input type="submit" className="btn" value="Submit"/>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.showSlider()}
      </div>
    )
  }
}

export default Slider;