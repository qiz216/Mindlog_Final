import React, { Component } from "react";
import TimePicker from "react-time-picker";
export class TimePicker extends Component {
  state = {
    time: "10:00",
  };

  onChange = (time) => this.setState({ time });

  render() {
    return (
      <div>
        <TP onChange={this.onChange} value={this.state.time} />
      </div>
    );
  }
}

export default TimePicker;
