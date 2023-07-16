import React from 'react'
import './variables.css'
import './global.css'
import Seo from './seo'
import Navigation from './navigation'

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <>
        <Seo />
        <Navigation />
        <main>{children}</main>
      </>
    )
  }
}

export default Template
