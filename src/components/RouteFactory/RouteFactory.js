import React from 'react';
import propTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import NotFound from '../routes/NotFound';

const classStyles = {
  fullSpan: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  withNav: {
    height: 'calc( 100% - 64px )',
    top: '64px',
  },
  withDrawer: {
    left: '300px',
    width: 'calc( 100% - 300px )',
  },
};

const RouteFactory = props => {
  const { routesConfig, routeList, classes } = props;
  return (
    <Switch>
      {routesConfig.map(route => {
        const RouteComponent = routeList[route.component];
        return (
          <Route
            exact={route.exact}
            key={route.path}
            path={route.path}
            render={() => (
              <div
                className={`${classes.fullSpan} ${!route.noNav ? classes.withNav : ''} ${
                  route.withDrawer ? classes.withDrawer : ''
                } `}
              >
                <RouteComponent />
              </div>
            )}
          />
        );
      })}
      <Route component={NotFound} />
    </Switch>
  );
};

RouteFactory.propTypes = {
  routesConfig: propTypes.array.isRequired,
  routeList: propTypes.object.isRequired,
  classes: propTypes.object.isRequired,
};

export default withStyles(classStyles)(RouteFactory);
