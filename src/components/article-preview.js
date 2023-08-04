import React, { useMemo, useState } from 'react'
import { Link } from 'gatsby'
import Container from './container'
import * as styles from './article-preview.module.css'

const ArticlePreview = ({ posts }) => {
  const [overPost, setOverPost] = useState()
  const [currentCategory, setCurrentCategory] = useState('All')
  const filter = useMemo(() => {
    if (currentCategory !== 'All') {
      return posts.filter((post) => post?.categories?.includes(currentCategory))
    }

    return posts
  }, [posts, currentCategory])

  const previewPost = useMemo(() => {
    if (posts?.length > 0 && !overPost) {
      return posts?.[0]
    }

    const targetPost = posts.find((post) => post.slug === overPost.slug)
    targetPost.isDirty = true
    return targetPost
  }, [posts, overPost])

  if (!filter || !Array.isArray(filter)) return null

  return (
    <Container>
      <ul className={styles.categoryList}>
        <li>
          <a
            onClick={setCurrentCategory.bind(this, 'All')}
            className={
              currentCategory === 'All' ? styles.activeCategory : undefined
            }
          >
            <span>[ All ]</span>
          </a>
        </li>
        <li>
          <a
            onClick={setCurrentCategory.bind(this, 'Commercial')}
            className={
              currentCategory === 'Commercial'
                ? styles.activeCategory
                : undefined
            }
          >
            <span>[ Commercial ]</span>
          </a>
        </li>
        <li>
          <a
            onClick={setCurrentCategory.bind(this, 'Artwork')}
            className={
              currentCategory === 'Artwork' ? styles.activeCategory : undefined
            }
          >
            <span>[ Artwork ]</span>
          </a>
        </li>
      </ul>

      <div className={styles.articleContainer}>
        <ul className={styles.articleList}>
          {filter.map((post) => {
            return (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className={styles.link}
                  onMouseEnter={setOverPost.bind(this, post)}
                >
                  <span className={styles.title}>{post.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className={styles.preview}>
          {filter.map((post) => {
            if (post?.heroImage?.file?.contentType?.includes('video')) {
              return (
                <Link key={post.slug} to={`/blog/${post.slug}`}>
                  <video
                    key={post.slug}
                    alt=""
                    src={
                      post?.isDirty || post.slug === previewPost.slug
                        ? post?.heroImage?.file?.url
                        : undefined
                    }
                    style={{
                      display:
                        post.slug === previewPost.slug ? 'block' : 'none',
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'top left',
                    }}
                    autoPlay={true}
                    playsInline={true}
                    controls={false}
                    loop={true}
                    muted={true}
                  />
                </Link>
              )
            } else if (post?.heroImage?.file?.contentType?.includes('image')) {
              return (
                <Link key={post.slug} to={`/blog/${post.slug}`}>
                  <img
                    key={post.slug}
                    alt=""
                    src={
                      post?.isDirty || post.slug === previewPost.slug
                        ? post?.heroImage?.file?.url
                        : undefined
                    }
                    style={{
                      display:
                        post.slug === previewPost.slug ? 'block' : 'none',
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'top left',
                    }}
                  />
                </Link>
              )
            }
          })}
        </div>
      </div>
    </Container>
  )
}

export default ArticlePreview
