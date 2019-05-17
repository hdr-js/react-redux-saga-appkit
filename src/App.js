import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import store from './store';
import Layout from './components/Layout';

import * as RouteComponents from './components/routes';
import routesConfig from './routesConfig';
import RouteFactory from './components/RouteFactory';
import './App.scss';
import theme from './theme';

const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="app">
            <Layout />
            <RouteFactory routeList={RouteComponents} routesConfig={routesConfig} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
