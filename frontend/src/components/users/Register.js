import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createPrompt } from "../../actions/prompts";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, password, password2 } = this.state;
    if (password !== password2) {
      this.props.createPrompt({
        passwordNotMatched: "Passwords do not match.",
      });
    } else {
      const newUser = {
        username,
        email,
        phone,
        password,
      };
      this.props.register(newUser);
    }
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { username, email, phone, password, password2 } = this.state;
    return (
      <div>
        <div className="col-md-6 m-auto">
          <div className="card card-body mt-5">
            <h2 className="text-center">Welcome To Mindlog</h2>
            <p>
              This is a side project created by James Botwina and Louis Zhao to
              explore how SMS text messages can be used to remind users to write
              micro-journal entries directly from thier phone's messaging
              applicaiton.
            </p>
            <strong>Please Note</strong>
            <ul>
              <li>You can delete your account on the Profile Tab</li>
              <li>
                You can sign up with a false email. There is no email
                confirmation at this time.
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-6 m-auto">
          <div className="card card-body mt-5">
            <h2 className="text-center">Register</h2>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  onChange={this.onChange}
                  value={username}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.onChange}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label>Phone (start with +1)</label>
                <input
                  type="phone"
                  className="form-control"
                  name="phone"
                  onChange={this.onChange}
                  value={phone}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.onChange}
                  value={password}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  onChange={this.onChange}
                  value={password2}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { register, createPrompt })(Register);
