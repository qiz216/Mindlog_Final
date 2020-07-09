import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMessage } from "../../actions/messages";

export class Form extends Component {
  state = {
    name: "",
    message: "",
  };

  static propTypes = {
    addMessage: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { name, message } = this.state;
    const reflection = { name, message };
    this.props.addMessage(reflection);
    this.setState({
      name: "",
      message: "",
    });
  };

  render() {
    const { name, message } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Reflection!</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Topic</label>
            <input
              placeholder="Name your reflection"
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              placeholder="Describe how you are feeling"
              className="form-control"
              type="text"
              name="message"
              onChange={this.onChange}
              value={message}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addMessage })(Form);
