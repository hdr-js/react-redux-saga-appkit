import React from 'react';
import propTypes from 'prop-types';
import MaterialTextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import classNames from 'classnames';

const classStyles = {
  labelAbove: {
    fontFamily: 'sans-serif',
    color: '#777777',
    display: 'block',
    fontSize: 14,
    fontWeight: 600,
    padding: '0 0 8px 0',
  },
  noLabelProvided: {
    padding: '0',
  },
  input: {
    boxSizing: 'border-box',
    padding: 8,
    fontFamily: 'sans-serif',
    fontSize: 16,
    color: '#000000',
    height: '120px',
    width: '100%',
    outline: 'none',
    '&:-webkit-autofill': {
      padding: '3px 8px',
      margin: '2px 2px',
      height: 46,
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: '0 8px 0 0',
    },
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: '0 8px 0 0',
    },
  },
  inputField: {
    boxShadow: 'inset 0px 0px 0px 2px #e6ecec',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    border: 'none',
    lineHeight: '16px',
    boxSizing: 'border-box',
    width: '100%',
    fontFamily: 'Avenir Next, sans-serif',
    '-webkit-appearance': 'none',
  },
  sizeSmall: {
    minWidth: '155px',
    maxWidth: '155px',
    width: '100%',
  },
  sizeMedium: {
    minWidth: '245px',
    maxWidth: '245px',
    width: '100%',
  },
  sizeLarge: {
    minWidth: '300px',
    maxWidth: '100%',
    width: '100%',
  },
  containerPadding: {
    padding: '0 0 16px 0',
    margin: '0 10px 0 10px',
  },
};

const isValueNull = value => value && value === '';

const getClassOnSize = size => {
  const sizeValue = size.toUpperCase();
  if (sizeValue === 'SMALL') {
    return classStyles.sizeSmall;
  }
  if (sizeValue === 'MEDIUM') {
    return classStyles.sizeMedium;
  }
  if (sizeValue === 'LARGE') {
    return classStyles.sizeLarge;
  }
  return null;
};

const TextArea = props => {
  const { classes, label, title, size, style, ...rest } = props;
  const labelClasses = classNames(
    classes.labelAbove,
    isValueNull(label) && classes.noLabelProvided,
  );
  const inputRoot = classNames(classes.inputField);
  const input = classNames(classes.input);
  return (
    <div
      title={title}
      style={Object.assign(
        {},
        classStyles.containerPadding,
        classStyles.sizeMedium,
        size && getClassOnSize(size),
        style,
      )}
    >
      <InputLabel
        classes={{
          root: labelClasses,
        }}
      >
        {label}
      </InputLabel>
      <MaterialTextField
        style={{ width: '100%' }}
        multiline
        rows="4"
        InputProps={{
          disableUnderline: true,
          classes: {
            root: inputRoot,
            input,
          },
        }}
        {...rest}
      />
    </div>
  );
};

TextArea.propTypes = {
  classes: propTypes.object.isRequired,
  label: propTypes.string,
  title: propTypes.string,
  size: propTypes.string,
  style: propTypes.object,
};

export default withStyles(classStyles, { muiName: 'mTextField' })(TextArea);
