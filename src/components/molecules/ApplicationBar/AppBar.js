import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import NavBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AccountCircle } from '@material-ui/icons';
import './AppBar.scss';
import logoAsset from '../../../assets/todolistlogo-1.png';

const classStyles = () => ({
  icon: {
    fontSize: 25,
    fill: '#222222',
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
  state = {
    menuAnchorEl: null,
  };

  handleLogout = () => {
    const { logout, history } = this.props;
    logout();
    history.push('/');
  };

  handleClickProfile = event => {
    this.setState({ menuAnchorEl: event.currentTarget });
  };

  render() {
    const { classes } = this.props;
    const { menuAnchorEl } = this.state;
    return (
      <Fragment>
        <NavBar id="MainNavigation" position="static" className={classes.appBar}>
          <Toolbar disableGutters>
            <div className={classes.mainDiv}>
              <div className="leftDiv">
                <img
                  className="logoImage"
                  src={logoAsset}
                  alt=""
                  onClick={this.handleOnLogoClick}
                />
              </div>
              <div className="centerDiv">
                <div className="innerCenterDiv">
                  <IconButton onClick={this.handleClickProfile}>
                    <AccountCircle
                      classes={{
                        root: classes.icon,
                      }}
                    />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={this.handleClickProfile}
                  >
                    <MenuItem key="logout" onClick={this.handleLogout}>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
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
