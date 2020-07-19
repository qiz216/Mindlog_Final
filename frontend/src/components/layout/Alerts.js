import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    prompt: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, prompt } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) {
        alert.error(`Name: ${error.msg.name.join()}`);
      }
      if (error.msg.message) {
        alert.error(`Message: ${error.msg.message.join()}`);
      }
      if (error.msg.non_field_errors) {
        alert.error(error.msg.non_field_errors.join());
      }
      if (error.msg.username) {
        alert.error(error.msg.username.join());
      }
    }
    if (prompt !== prevProps.prompt) {
      if (prompt.deleteReflection) {
        alert.success(prompt.deleteReflection);
      }
      if (prompt.addReflection) {
        alert.success(prompt.addReflection);
      }
      if (prompt.passwordNotMatched) {
        alert.error(prompt.passwordNotMatched);
      }
      if (prompt.addTime) {
        alert.success(prompt.addTime);
      }
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errorsReducer,
  prompt: state.promptsReducer,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
