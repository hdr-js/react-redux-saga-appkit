import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import propTypes from 'prop-types';
import './LoginForm.scss';
import TextField from '../common/TextField';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keepSignedIn: false,
      fields: {
        email: '',
        password: '',
      },
    };
  }

  handleFieldChange = name => event => {
    const { fields } = this.state;
    this.setState({
      fields: { ...fields, [name]: event.target.value },
    });
  };

  handleLoginSubmit = event => {
    event.preventDefault();
    const invalid = false;
    if (!invalid) {
      this.callOnSubmit();
    }
  };

  callOnSubmit = () => {
    const { onSubmit } = this.props;
    const { fields } = this.state;
    onSubmit(fields);
  };

  handleChange = event => {
    this.setState({ keepSignedIn: event.target.checked });
  };

  render() {
    const { isLoading, error } = this.props;
    const {
      fields: { email, password },
      keepSignedIn,
    } = this.state;
    const buttonLabel = (
      <span className="button-label">
        Login
        {isLoading && <CircularProgress size={20} className="buttonLabelProgress" />}
      </span>
    );
    return (
      <div className="wrapper">
        <Paper className="loginRouteContainer">
          <div className="loginBannerContainer">
            <img className="loginBannerImage" src="http://lorempixel.com/500/600/food/" alt="" />
          </div>
          <div className="login-form-outer">
            <div className="login-form-inner">
              <div className="logoContainer">
                <img src="http://lorempixel.com/150/50/food/" alt="" />
              </div>
              <div className="loginFiledsContainer">
                <form onSubmit={this.handleLoginSubmit}>
                  <h3>Login</h3>
                  <TextField
                    required
                    size="LARGE"
                    name="email"
                    label="Email"
                    value={email}
                    onChange={this.handleFieldChange('email')}
                    placeholder="Email..."
                  />
                  <TextField
                    required
                    size="LARGE"
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={this.handleFieldChange('password')}
                    placeholder="Password..."
                  />
                  {error && <div className="loginError">{error}</div>}
                  <div className="login-controls">
                    <FormControlLabel
                      control={<Checkbox checked={keepSignedIn} onChange={this.handleChange} />}
                      label="Keep me logged in"
                    />
                    <div className="forgot-div">
                      <Typography variant="subtitle2" className="blue">
                        Forgot password?
                      </Typography>
                    </div>
                  </div>
                  <div className="button-div">
                    <Button variant="contained" className="login-button" type="submit">
                      {buttonLabel}
                    </Button>
                  </div>
                </form>
                <div className="sign-up-div">
                  <Typography variant="subtitle2">You do not have an account?</Typography>
                  <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <Typography variant="subtitle2" className="blue">
                      Sign Up
                    </Typography>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
  isLoading: propTypes.bool.isRequired,
  error: propTypes.string,
};

export default LoginForm;
