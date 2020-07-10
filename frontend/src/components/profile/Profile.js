import React, { Component, Fragment } from "react";
import TimeSelector from "./TimeSelector";
import ProfileChanger from "./ProfileChanger";
export class Profile extends Component {
  onChange = (time) => this.setState({ time });

  render() {
    return (
      <Fragment>
        Change your profile here.
        <div>
          <ProfileChanger />
        </div>
        <div>
          <TimeSelector />
        </div>
      </Fragment>
    );
  }
}

export default Profile;
