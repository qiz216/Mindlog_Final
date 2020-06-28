import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMessages, deleteMessage } from "../../actions/messages";

export class Messages extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    getMessages: PropTypes.func.isRequired,
    deleteMessage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getMessages();
  }
  render() {
    return (
      <Fragment>
        <h2>Reflection List</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Reflection</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.name}</td>
                <td>{msg.message}</td>
                <td>
                  <button
                    onClick={this.props.deleteMessage.bind(this, msg.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messagesReducer.messages,
});

export default connect(mapStateToProps, { getMessages, deleteMessage })(
  Messages
);
