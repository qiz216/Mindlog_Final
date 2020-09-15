import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editUser, deleteUser } from "../../actions/auth";

export class ProfileChanger extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    editUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (e.target.username) {
      this.props.editUser({ username: e.target.username.value });
    }
    if (e.target.email) {
      this.props.editUser({ email: e.target.email.value });
    }
    if (e.target.phone) {
      this.props.editUser({ phone: e.target.phone.value });
    }
  };

  // delete the user's account
  onDelete = () => {
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
              <input
                placeholder={user.username}
                className="form-control"
                type="text"
                name="username"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Change Username
              </button>
            </div>
          </form>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                placeholder={user.email}
                className="form-control"
                type="text"
                name="email"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Change Email
              </button>
            </div>
          </form>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                placeholder={user.phone}
                className="form-control"
                type="text"
                name="phone"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Change Phone Number
              </button>
            </div>
          </form>
          <br />
          <div className="form-group">
            <strong>ONCE DELETED ALL DATA WILL BE LOST</strong>
          </div>
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
