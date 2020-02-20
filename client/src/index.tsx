import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import Cookies from 'cookies-js';
import { SnackbarProvider } from 'notistack';

import { Provider } from 'react-redux'
import { logger } from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { primaryColor } from 'resources/variables'
import { createHashHistory } from 'history'
import { createCookieMiddleware } from 'redux-cookie';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Router from 'router'
import reducers from 'redux/reducers'
import sagas from 'redux/sagas'

import 'resources/GuarStyles/Vendors/vendor.guarui.scss';
import 'resources/GuarStyles/Core/core.guarui.scss';

import { AbilityContext } from 'config/can';
import { ability, defineRulesFor } from 'config/ability';

import * as serviceWorker from './serviceWorker';

const history = createHashHistory()
const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const cookieMiddleware = createCookieMiddleware(Cookies)

const middlewares = [thunk, sagaMiddleware, routeMiddleware, cookieMiddleware]
if (process.env.NODE_ENV === 'development' && true) {
  middlewares.push(logger)
}
const store = createStore(reducers(history), compose(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas)

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    themeLight?: boolean;
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
  },
});

// Update ACL
let currentAuth: any;
store.subscribe(() => {
  const prevAuth = currentAuth;
  currentAuth = store.getState().user;
  if (prevAuth !== currentAuth) {
    ability.update(defineRulesFor(currentAuth));
  }
});

ReactDOM.render(
  <Provider store={store}>
    <AbilityContext.Provider value={ability}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Router history={history} />
        </SnackbarProvider>
      </ThemeProvider>
    </AbilityContext.Provider>
  </Provider>,
  document.getElementById('root')
 ); 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
