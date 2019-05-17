import * as React from 'react';
import propTypes from 'prop-types';
import AppBar from '../molecules/ApplicationBar';
import Drawer from '../molecules/Drawer';

const Layout = props => {
  const { loggedIn, isDrawerOpen, drawerVariant } = props;
  if (loggedIn) {
    return (
      <React.Fragment>
        <AppBar />
        <Drawer isDrawerOpen={isDrawerOpen} variant={drawerVariant} />
      </React.Fragment>
    );
  }
  return null;
};

Layout.propTypes = {
  loggedIn: propTypes.any,
  isDrawerOpen: propTypes.any,
  drawerVariant: propTypes.string,
};

export default Layout;
