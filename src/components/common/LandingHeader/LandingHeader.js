import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'nowrap',
    justifyContent: 'space-between',
    height: '100px',
  },
  logoContainer: {
    boxSizing: 'border-box',
    width: '250px',
    height: '100%',
    padding: '25px 40px',
  },
  onBoradingActionContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'nowrap',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    width: '450px',
    height: '100%',
    padding: '35px 40px',
  },
  howItWorksContainer: {
    width: '300px',
  },
  transparentButton: {
    color: '#0097FF',
    height: '35px',
  },
  requestInviteButton: {
    backgroundColor: '#0097FF',
    color: 'white',
    height: '35px',
    '&:hover': {
      backgroundColor: '#0095ff',
    },
  },
};

const LandingHeader = props => {
  const { classes, page } = props;
  return (
    <div className={classes.root}>
      <div className={classes.logoContainer}>
        <img src={logo} alt="logo" />
      </div>
      <div
        className={`${classes.onBoradingActionContainer} ${page === 'howItWorks' &&
          classes.howItWorksContainer}`}
      >
        {page !== 'howItWorks' && (
          <Button
            color="primary"
            className={classes.transparentButton}
            component={Link}
            to="/how-it-works"
          >
            How it works
          </Button>
        )}
        <Button color="primary" className={classes.transparentButton} component={Link} to="/login">
          Login
        </Button>
        <Button
          variant="contained"
          className={classes.requestInviteButton}
          component={Link}
          to="/signup"
        >
          Request Invite
        </Button>
      </div>
    </div>
  );
};

LandingHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  page: PropTypes.string,
};

export default withStyles(styles)(LandingHeader);
