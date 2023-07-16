import React, {useEffect, useState} from 'react'
import { Link } from 'gatsby'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import InlineImages from '../components/inline-images'
import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import * as styles from './blog-post.module.css'
import { createClient } from "contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const BlogPost = (props) => {
  console.log(props)
  const [post, setPost] = useState()
  const {slug} = props.pageContext
  const next = props.pageContext.next
  const previous = props.pageContext.previous

  useEffect(()=>{
    const client = createClient({
      space: process.env.CONTENTFUL_GATSBY_SPACE_ID,
      accessToken: process.env.CONTENTFUL_GATSBY_ACCESS_TOKEN,
    })

    client.getEntries({
        content_type: "blogPost",
        limit: 1,
        include: 10,
        "fields.slug": slug,
      })
      .then((entry) => {
        console.log("entty", entry)
        setPost(entry?.items?.[0].fields)
      })
      .catch(console.error)
  }, [slug])

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        const images = node?.data?.target?.fields?.images
        return images ? <InlineImages images={images} /> : null
      },
    },
  }

  if(!post){
    return null
  }

  console.log(post)
  return (
    <Layout location={props.location}>
      <Seo
        title={post.title}
        description={documentToPlainTextString(post.description)}
        image={`http:${post.heroImage.fields.file.url}`}
      />
      <Hero
        image={post.heroImage?.gatsbyImage}
        title={post.title}
        content={post.description}
      />
      <div className={styles.article}>
        <div className={styles.body}>
          {post.body && documentToReactComponents(post.body, options)}
        </div>
        {(previous || next) && (
          <nav>
            <ul className={styles.articleNavigation}>
              {previous && (
                <li>
                  <Link to={`/blog/${previous.slug}`} rel="prev">
                    ← {previous.title}
                  </Link>
                </li>
              )}
              {next && (
                <li>
                  <Link to={`/blog/${next.slug}`} rel="next">
                    {next.title} →
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </Layout>
  )
}

export default BlogPost
