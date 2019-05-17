import * as React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import LoginForm from '../LoginForm';

class Login extends React.Component {
  handleSubmit = fields => {
    const { login } = this.props;
    login(fields);
  };

  render() {
    const { loggedIn, location, isLoading, error } = this.props;

    if (loggedIn) {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      );
    }
    return <LoginForm isLoading={isLoading} onSubmit={this.handleSubmit} error={error} />;
  }
}

Login.propTypes = {
  login: propTypes.func.isRequired,
  loggedIn: propTypes.bool.isRequired,
  location: propTypes.object,
  isLoading: propTypes.bool.isRequired,
  error: propTypes.any,
};

export default Login;
