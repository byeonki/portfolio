import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import Person from '../components/person'
class AboutIndex extends React.Component {
  render() {
    const persons = get(this, 'props.data.allContentfulPerson.nodes')

    if(!persons?.length){
      return null
    }

    return (
      <Layout location={this.props.location}>
        <Person person={persons[0]} />
      </Layout>
    )
  }
}

export default AboutIndex

export const pageQuery = graphql`
  query PersonQuery {
    allContentfulPerson(sort: { name: DESC }) {
      nodes {
        name
        title
        shortBio {
          raw
        }
        client {
          raw
        }
        exh {
          raw
        }
      }
    }
  }
`
