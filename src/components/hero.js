import React from 'react'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import * as styles from './hero.module.css'

const Hero = ({ title, content }) => (
  <div className={styles.hero}>
    <div className={styles.details}>
      <h1 className={styles.title}>{title}</h1>
      {content && (
        <div className={styles.content}>{documentToReactComponents(content)}</div>
      )}
    </div>
  </div>
)

export default Hero
