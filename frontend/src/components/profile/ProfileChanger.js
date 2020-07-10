import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editUser } from "../../actions/auth";

export class ProfileChanger extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  render() {
    const { user } = this.props.auth;
    console.log(user);
    return (
      <div>
        <strong>{`This is your  ${user.id}`}</strong>
        <button className="btn btn-danger btn-sm" onClick={this.props.editUser}>
          Edit Username
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { editUser })(ProfileChanger);
