import React from 'react'

import Layout from '../components/layout'

class AboutIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <span>about</span>
      </Layout>
    )
  }
}

export default AboutIndex
