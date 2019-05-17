import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import NavBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { AccountCircle, ExpandMore, ExpandLess, OfflineBolt, Mail } from '@material-ui/icons';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import './AppBar.scss';
import logoAsset from '../../../assets/logo.png';

const classStyles = () => ({
  icon: {
    fontSize: 25,
    marginTop: '8px',
    marginBottom: '8px',
    fill: 'rgb(66, 170, 243)',
  },
  expandIcon: {
    fontSize: 25,
    fill: 'black',
  },
  appBar: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'white',
    position: 'fixed',
  },
  iconButton: {
    margin: 0,
    padding: 'unset',
    '&:hover': {
      backgroundColor: 'unset',
    },
  },
  nameSpan: {
    margin: 'auto 10px',
    color: 'black',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    marginRight: '5px',
  },
  iconDiv: {
    display: 'flex',
  },
  mainDiv: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

class AppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userOpen: false,
    };
  }

  handleOnLogoClick = () => {
    // console.log('clicked')
    // this.props.history.push('/landing');
  };

  handleExpand = () => {
    this.setState(prevState => ({ userOpen: !prevState.userOpen }));
  };

  handleLogout = () => {
    const { logout, history } = this.props;
    logout();
    history.push('/login');
  };

  render() {
    const { classes } = this.props;
    const { userOpen } = this.state;
    return (
      <Fragment>
        <NavBar id="MainNavigation" position="static" className={classes.appBar}>
          <Toolbar disableGutters>
            <div className={classes.mainDiv}>
              <div className="leftDiv">
                <img className="logoImage" src={logoAsset} alt="" onClick={this.handleOnLogoClick} />
              </div>
              <div className="centerDiv">
                <div className="innerCenterDiv">
                  <Mail
                    classes={{
                      root: classes.icon,
                    }}
                  />
                  <OfflineBolt
                    classes={{
                      root: classes.icon,
                    }}
                  />
                  <AccountCircle
                    classes={{
                      root: classes.icon,
                    }}
                  />
                </div>
              </div>
              <div className="rightDiv" onClick={this.handleExpand}>
                <span className={classes.nameSpan}>John Smith Doh Cement GarA</span>
                <IconButton
                  disableRipple
                  className={classes.iconButton}
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                >
                  <div className={classes.iconDiv}>
                    {userOpen ? (
                      <ExpandLess
                        classes={{
                          root: classes.expandIcon,
                        }}
                      />
                    ) : (
                        <ExpandMore
                          classes={{
                            root: classes.expandIcon,
                          }}
                        />
                      )}
                  </div>
                </IconButton>
                <Popper open={userOpen} anchorEl={this.anchorEl} transition disablePortal>
                  {({ TransitionProps }) => (
                    <Grow {...TransitionProps} id="menu-list-grow">
                      <Paper>
                        <MenuList>
                          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                        </MenuList>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </div>
          </Toolbar>
        </NavBar>
      </Fragment>
    );
  }
}

AppBar.propTypes = {
  classes: propTypes.object.isRequired,
  logout: propTypes.func,
  history: propTypes.any,
};

export default withRouter(withStyles(classStyles)(AppBar));
