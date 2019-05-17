import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'nowrap',
    justifyContent: 'center',
    height: '35px',
    width: '100%',
  },
  leftButton: {
    backgroundColor: '#0097FF',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    boxShadow: 'none',
    color: 'white',
    height: '35px',
    '&:hover': {
      backgroundColor: '#0095ff',
    },
  },
  rightButton: {
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    boxShadow: 'none',
    backgroundColor: '#0097FF',
    color: 'white',
    height: '35px',
    '&:hover': {
      backgroundColor: '#0095ff',
    },
  },
  selectedButton: {
    backgroundColor: '#FFFFFF',
    color: '#0097FF',
    boxShadow: 'inset 0px 0px 0px 2px #0097FF',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
    '&:active': {
      backgroundColor: '#FFFFFF',
      boxShadow: 'none',
    },
  },
};

const ToggleButton = props => {
  const { classes, selected, onChange } = props;
  return (
    <div className={classes.root}>
      <Button
        onClick={() => selected !== 'influencers' && onChange('influencers')}
        variant="contained"
        className={`${classes.leftButton} ${
          selected === 'influencers' ? classes.selectedButton : ''
        }`}
      >
        Featured Influencers
      </Button>
      <Button
        onClick={() => selected !== 'campaigns' && onChange('campaigns')}
        variant="contained"
        className={`${classes.rightButton} ${
          selected === 'campaigns' ? classes.selectedButton : ''
        }`}
      >
        Featured Campaigns
      </Button>
    </div>
  );
};

ToggleButton.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

export default withStyles(styles)(ToggleButton);
