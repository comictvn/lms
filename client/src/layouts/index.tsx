import React, { Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
import Loader from 'components/LayoutComponents/Loader'
import Notifier from 'components/GuardComponents/Notifier'
import PublicLayout from './Public'
import LoginLayout from './Login'
import MainLayout from './Main'

const Layouts = {
  public: PublicLayout,
  login: LoginLayout,
  main: MainLayout,
}

class IndexLayout extends React.PureComponent<any, any> {
  previousPath: string = ''

  componentDidUpdate(prevProps: any) {
    const { location } = this.props
    const { prevLocation } = prevProps
    if (location !== prevLocation) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const {
      children,
      location: { pathname, search },
      user
    } = this.props

    // NProgress Management
    const currentPath = pathname + search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    setTimeout(() => {
      NProgress.done()
      this.previousPath = currentPath
    }, 300)

    // Layout Rendering
    const getLayout = () => {
      if (pathname === '/') {
        return 'public'
      }
      if (/^\/user(?=\/|$)/i.test(pathname)) {
        return 'login'
      }
      return 'main'
    }

    const Container = Layouts[getLayout()]
    const isUserAuthorized: boolean = user.authorized
    const isUserLoading: boolean = user.loading
    const isLoginLayout: boolean = getLayout() === 'login'

    const BootstrappedLayout = () => {
      // show loader when user in check authorization process, not authorized yet and not on login pages
      if (isUserLoading && !isUserAuthorized && !isLoginLayout) {
        return <Loader spinning={isUserLoading} fullScreen={true} />
      }
      // redirect to login page if current is not login page and user not authorized
      if (!isLoginLayout && !isUserAuthorized) {
        return <Redirect to="/user/login" />
      }
      // redirect to main dashboard when user on login page and authorized
      if (isLoginLayout && isUserAuthorized) {
        return <Redirect to="/managements/users" />
      }
      // in other case render previously set layout
      return <Container>{children}</Container>
    }

    return (
      <Fragment>
        <Notifier />
        <Helmet titleTemplate="IWA | %s" title="IWA" />
        {BootstrappedLayout()}
      </Fragment>
    )
  }
}

const mapStateToProps = (state: any, props: any) => ({
  user: state.user
})

export default withRouter(
  connect(mapStateToProps)(IndexLayout)
);
