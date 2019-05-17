import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    padding: '0px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  buttonContained: {
    boxShadow: 'none',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    backgroundColor: '#0097FF',
    color: 'white',
  },
};

const ButtonContainedField = props => {
  const { classes, buttonText, buttonHandler, fieldPlaceholder, fieldValue, fieldOnChange } = props;

  return (
    <Paper className={classes.root}>
      <InputBase
        value={fieldValue}
        onChange={fieldOnChange}
        className={classes.input}
        placeholder={fieldPlaceholder}
      />
      <Button className={classes.buttonContained} variant="contained" onClick={buttonHandler}>
        {buttonText}
      </Button>
    </Paper>
  );
};

ButtonContainedField.propTypes = {
  classes: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonHandler: PropTypes.func.isRequired,
  fieldPlaceholder: PropTypes.string.isRequired,
  fieldOnChange: PropTypes.func.isRequired,
  fieldValue: PropTypes.string.isRequired,
};

export default withStyles(styles)(ButtonContainedField);
