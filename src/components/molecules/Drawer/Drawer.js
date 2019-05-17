import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaterialDrawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import './Drawer.scss';
import NestedNavigationList from '../NestedNavigationList';

const inlineStyles = {
  logoImage: {
    height: '95px',
    width: '95px',
    borderRadius: '50%',
  },
  drawer: {
    width: '300px',
    backgroundColor: '#17203a',
    marginTop: '64px',
  },
  input: {
    boxSizing: 'border-box',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    height: '35px',
    lineHeight: '35px',
    outline: 'none',
    color: '#FFFFFF',
  },
  inputField: {
    padding: '0px 15px',
    boxShadow: 'inset 0px 0px 0px 2px #347FFE',
    borderRadius: 20,
    border: 'none',
    boxSizing: 'border-box',
    width: '100%',
    fontFamily: 'Roboto, sans-serif',
  },
};

const Drawer = props => {
  const { classes, isDrawerOpen } = props;
  return (
    <Fragment>
      <MaterialDrawer
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        className={classes.drawer}
        elevation={2}
        classes={{
          paper: classes.drawer,
        }}
      >
        <div className="mainDiv">
          <div className="searchContainer">
            <TextField
              InputProps={{
                disableUnderline: true,
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              inputProps={{
                className: classes.input,
              }}
              placeholder="Search here"
              className={classes.inputField}
            />
          </div>
          <div className="navigationListContainer">
            <NestedNavigationList
              listData={[
                {
                  level: 0,
                  label: 'Collaboration',
                  value: 'collaborationRoot',
                  items: [
                    {
                      level: 1,
                      label: 'Create Collaboration',
                      value: 'createCollaborationRoot',
                    },
                    {
                      level: 1,
                      label: 'Demo',
                      value: 'collaborationDemo',
                      items: [
                        {
                          level: 2,
                          label: 'Explore',
                          value: 'explore',
                        },
                        {
                          level: 2,
                          label: 'My Influencers',
                          value: 'myInfluencers',
                        },
                        {
                          level: 2,
                          label: 'Requests',
                          value: 'requests',
                        },
                        {
                          level: 2,
                          label: 'Insights',
                          value: 'insights',
                        },
                      ],
                    },
                  ],
                },
                {
                  level: 0,
                  label: 'My Lists',
                  value: 'myListsRoot',
                  items: [
                    {
                      level: 1,
                      label: 'Create a List',
                      value: 'createListRoot',
                    },
                    {
                      level: 1,
                      label: 'Demo',
                      value: 'listDemo',
                      items: [
                        {
                          level: 2,
                          label: 'Summer Campaign',
                          value: 'summerCampaign',
                        },
                        {
                          level: 2,
                          label: 'Launch Campaign',
                          value: 'launchCampaign',
                        },
                        {
                          level: 2,
                          label: 'Reviews',
                          value: 'reviews',
                        },
                        {
                          level: 2,
                          label: 'Ambassadors',
                          value: 'ambassadors',
                        },
                      ],
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </MaterialDrawer>
    </Fragment>
  );
};

Drawer.propTypes = {
  classes: propTypes.object.isRequired,
  isDrawerOpen: propTypes.bool.isRequired,
};

export default withStyles(inlineStyles)(Drawer);
