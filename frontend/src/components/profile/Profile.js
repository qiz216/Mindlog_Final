import React, { Component, Fragment } from "react";
import TimePicker from "react-time-picker";
import TimeSelector from "./TimeSelector";
export class Profile extends Component {
  state = {
    time: "23:00",
  };

  onChange = (time) => this.setState({ time });

  render() {
    return (
      <Fragment>
        <div>
          <TimeSelector />
        </div>
        <div>Profile Component</div>
      </Fragment>
    );
  }
}

export default Profile;
