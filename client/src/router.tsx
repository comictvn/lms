import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Loadable from 'react-loadable'
import { PageObject } from 'utils/routers';
import Loader from 'components/LayoutComponents/Loader'
import IndexLayout from 'layouts'
import NotFoundPage from 'pages/404'
import Authorization from 'components/GuardComponents/Authorization';

const loadable = (loader: any) =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader spinning={true} fullScreen={true} />,
  })

const routes = [
  // System Pages
  {
    path: '/user/login',
    component: loadable(() => import('pages/User/Login')),
    exact: true,
  },

  // Dashboards
  {
    path: '/managements/users',
    component: loadable(() => import('pages/Managements/User/List')),
    exact: true,
    pageObject: PageObject.User,
  },
  {
    path: '/managements/users/create',
    component: loadable(() => import('pages/Managements/User/Create')),
    exact: true,
    pageObject: PageObject.User,
  },
  {
    path: '/managements/users/:userId/edit',
    component: loadable(() => import('pages/Managements/User/Update')),
    exact: true,
    pageObject: PageObject.User,
  },
  {
    path: '/managements/assignments',
    component: loadable(() => import('pages/Managements/Assignment/List')),
    exact: true,
    pageObject: PageObject.Assignment,
  },
  {
    path: '/managements/assignments/create',
    component: loadable(() => import('pages/Managements/Assignment/Create')),
    exact: true,
    pageObject: PageObject.Assignment,
  },
  {
    path: '/managements/assignments/:assignmentId/edit',
    component: loadable(() => import('pages/Managements/Assignment/Update')),
    exact: true,
    pageObject: PageObject.Assignment,
  },
]

class Router extends React.Component<any, any> {
  render() {
    const { history } = this.props
    return (
      <ConnectedRouter history={history}>
        <IndexLayout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/managements/users" />} />
            {routes.map(route => (
              <Route
                path={route.path}
                component={Authorization(route.component, route.pageObject)}
                key={route.path}
                exact={route.exact}
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </IndexLayout>
      </ConnectedRouter>
    )
  }
}

export default Router
