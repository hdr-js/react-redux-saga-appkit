import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  input: {
    display: 'none',
  },
  button: {
    backgroundColor: '#0097FF',
    boxShadow: 'none',
    color: 'white',
    height: '35px',
    width: '300px',
    '&:hover': {
      backgroundColor: '#0095ff',
    },
  },
};

const UploadButton = props => {
  const { classes, onChange } = props;
  const handleFile = e => {
    const reader = new FileReader();
    const imgUrl = reader.result;
    const img = e.target.files[0];
    reader.onloadend = () => {
      onChange({
        file: img,
        url: imgUrl,
      });
    };
    reader.readAsDataURL(img);
  };

  return (
    <label htmlFor="contained-button-file">
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={onChange}
      />
      <Button variant="contained" component="span" className={classes.button}>
        Upload
      </Button>
    </label>
  );
};

UploadButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(UploadButton);
