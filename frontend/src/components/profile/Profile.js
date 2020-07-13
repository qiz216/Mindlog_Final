import React, { Component, Fragment } from "react";
import TimeSelector from "./TimeSelector";
import ProfileChanger from "./ProfileChanger";
export class Profile extends Component {
  onChange = (time) => this.setState({ time });

  render() {
    return (
      <Fragment>
        <div>
          <div>
            <TimeSelector />
          </div>
          <div>
            <ProfileChanger />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
