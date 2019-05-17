import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = {
  root: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    height: '100%',
    width: '80%',
  },
  gridCol: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '32%',
  },
  gridCell: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'silver',
    width: '100%',
    height: '32%',
    borderRadius: '8px',
    boxShadow: '5px 5px 8px 0px #CCCCCC',
  },
  rowSpanTwo: {
    height: '66%',
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
      borderRadius: '8px',
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
  campaignTileFooter: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '50px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
  },
  tileFooterText: {
    margin: '0 auto',
    width: '90%',
    fontSize: '11px',
    textAlign: 'center',
  },
};

const handleGridTileClick = value => {
  alert(value);
};

const RowSpanGrid = props => {
  const { classes, imageData } = props;
  if (!imageData) return null;
  return (
    <div className={classes.root}>
      {imageData.map(col => (
        <div className={classes.gridCol}>
          {col.map(cell => (
            <div
              style={{
                backgroundImage: `url(${cell.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
              className={`${classes.gridCell} ${cell.rowSpan === 2 ? classes.rowSpanTwo : ''}`}
            >
              <div className={classes.tileContent}>
                <Button
                  variant="contained"
                  value={cell.src}
                  className={classes.viewProfileButton}
                  onClick={() => handleGridTileClick(cell.src)}
                >
                  View Campaign
                </Button>
              </div>
              <div className={classes.campaignTileFooter}>
                <p className={classes.tileFooterText}>{cell.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

RowSpanGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  imageData: PropTypes.array.isRequired,
};

export default withStyles(styles)(RowSpanGrid);
