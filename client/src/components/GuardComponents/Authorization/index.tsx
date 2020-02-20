import React from 'react';
import NotFoundPage from 'pages/404';
import { AbilityContext } from 'config/can';

const Authorization = (WrappedComponent: any, pageObject?: string) => {
  return class WithAuthorization extends React.Component {
    static contextType = AbilityContext;

    render() {
      return !pageObject || this.context.can('view', pageObject) ? <WrappedComponent /> : <NotFoundPage />;
    }
  };
};

export default Authorization;
