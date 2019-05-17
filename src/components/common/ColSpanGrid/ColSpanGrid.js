import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '80%',
  },
  gridRow: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '32%',
  },
  gridCell: {
    backgroundColor: 'silver',
    height: '100%',
    width: '32%',
    borderRadius: '5px',
    boxShadow: '5px 5px 8px 0px #CCCCCC',
  },
  colSpanTwo: {
    width: '66%',
  },
  tileContent: {
    opacity: '0',
    height: '100%',
    width: '100%',
    '&:hover': {
      opacity: '1',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '5px',
    },
  },
  viewProfileButton: {
    backgroundColor: '#0097FF',
    color: 'white',
    height: '35px',
    '&:hover': {
      backgroundColor: '#0095ff',
    },
  },
};

const handleGridTileClick = value => {
  alert(value);
};

const ColSpanGrid = props => {
  const { classes, imageData } = props;
  if (!imageData) return null;
  return (
    <div className={classes.root}>
      {imageData.map(row => (
        <div className={classes.gridRow}>
          {row.map(cell => (
            <div
              style={{
                backgroundImage: `url(${cell.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
              className={`${classes.gridCell} ${cell.colSpan === 2 ? classes.colSpanTwo : ''}`}
            >
              <div className={classes.tileContent}>
                <Button
                  variant="contained"
                  value={cell.src}
                  className={classes.viewProfileButton}
                  onClick={() => handleGridTileClick(cell.src)}
                >
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

ColSpanGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  imageData: PropTypes.array.isRequired,
};

export default withStyles(styles)(ColSpanGrid);
