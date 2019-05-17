import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Root = props => {
  const { loggedIn } = props;
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return <Redirect to="/home" />;
};

Root.propTypes = {
  loggedIn: propTypes.bool.isRequired,
};

export default Root;
