import React, { useMemo, useState } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Container from './container'
import Tags from './tags'
import * as styles from './article-preview.module.css'

const ArticlePreview = ({ posts }) => {
  const [overPost, setOverPost] = useState()
  const [currentCategory, setCurrentCategory] = useState("All")
  const filter = useMemo(()=> {
    if(currentCategory !== "All"){
      return posts.filter((post)=> post?.categories?.includes(currentCategory))
    }

    return posts
  }, [posts, currentCategory])

  const previewPost = useMemo(()=> {
    if(posts?.length > 0 && !overPost){
      return posts?.[0]
    }
    return posts.find((post => post.slug === overPost.slug))
  }, [posts, overPost])

  if (!filter || !Array.isArray(filter)) return null

  return (
    <Container>
      <ul className={styles.categoryList}>
        <li>
          <a onClick={setCurrentCategory.bind(this,"All")} className={currentCategory === "All" ? styles.activeCategory : undefined}>
            <span>[ All ]</span>
          </a>
        </li>
        <li>
          <a onClick={setCurrentCategory.bind(this,"Commercial")} className={currentCategory === "Commercial" ? styles.activeCategory : undefined}>
            <span>[ Commercial ]</span>
          </a>
        </li>
        <li>
          <a onClick={setCurrentCategory.bind(this,"Artwork")} className={currentCategory === "Artwork" ? styles.activeCategory : undefined}>
            <span>[ Artwork ]</span>
          </a>
        </li>
      </ul>

      <div className={styles.articleContainer}>
        <ul className={styles.articleList}>
          {filter.map((post)=>{
            return (
              <li key={post.slug}>
                <Link to={`/blog/${post.slug}`} className={styles.link} onMouseEnter={setOverPost.bind(this, post)} >
                  <span className={styles.title}>{post.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
        <div className={styles.preview}>
            {previewPost && <Link to={`/blog/${previewPost.slug}`}><GatsbyImage alt="" image={previewPost?.heroImage?.gatsbyImage} /></Link>}
        </div>
      </div>
    </Container>
  )
}

export default ArticlePreview
