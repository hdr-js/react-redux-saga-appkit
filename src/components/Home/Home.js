import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './Home.scss';

class NotFound extends Component {
  backToHome = () => {
    const { history } = this.props;
    history.push('/dashboard');
  };

  render() {
    return <div className={styles.wrapper}>Home</div>;
  }
}

NotFound.propTypes = {
  history: propTypes.array.isRequired,
};

export default withRouter(NotFound);
