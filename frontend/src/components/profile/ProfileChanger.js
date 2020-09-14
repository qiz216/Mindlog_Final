import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editUser, deleteUser } from "../../actions/auth";

export class ProfileChanger extends Component {
  state = {
    username: "",
    email: "",
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    editUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { user } = this.props.auth;
    this.setState({ username: user.username, email: user.email });
    console.log(this.state);
  }
  onChange = (e) => this.setState({ [e.target.username]: e.target.email });

  onSubmit = (e) => {
    e.preventDefault();
    const new_username = e.target.username.value;
    const new_email = e.target.email.value;
    if (new_username && new_email) {
      console.log(
        `The new username is ${new_username} and the new email is ${new_email}`
      );
      const new_info = { username: new_username, email: new_email };
      this.props.editUser(new_info);
      //window.location.reload(false);
    } else if (new_username) {
      console.log(`The new username is ${new_username}`);
      const new_info = { username: new_username };
      this.props.editUser(new_info);
      //window.location.reload(false);
    } else if (new_email) {
      console.log(`The new username is ${new_email}`);
      const new_info = { email: new_email };
      this.props.editUser(new_info);
    } else {
      console.log("Throw error, neither is changed");
    }
  };

  onDelete = () => {
    console.log("DELETE");
    this.props.deleteUser();
    location.reload();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className="card card-body mt-4 mb-4">
          <h2>Change your profile information!</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Change username</label>
              <input
                placeholder={user.username}
                className="form-control"
                type="text"
                name="username"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label>Change email</label>
              <textarea
                placeholder={user.email}
                className="form-control"
                type="text"
                name="email"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          <div className="form-group">
            <button
              onClick={this.onDelete}
              type="submit"
              className="btn btn-danger"
            >
              DELETE ACCOUNT
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { editUser, deleteUser })(
  ProfileChanger
);
