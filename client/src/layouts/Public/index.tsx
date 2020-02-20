import React from 'react'
import { withRouter } from 'react-router-dom'

interface ProfileProps {
  children: any
}

class PublicLayout extends React.PureComponent<any, ProfileProps> {
  render() {
    const { children } = this.props
    return children
  }
}

export default withRouter(PublicLayout)
