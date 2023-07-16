import React from 'react'

import * as styles from './inline-images.module.css'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const InlineImages = ({ images }) => {
  if(!images?.length){
    return null
  }

  return (
    <div className={styles.inlineImageContainer + " " + styles[`inlineImageContainerWith${images.length}`]}>
      {
        images.map((image, index)=>{
          return (
            <div className={styles.inlineImage} key={index}>
              <GatsbyImage image={getImage(image?.gatsbyImage)} />
            </div>
          )
        })
      }
    </div>
  )
}

export default InlineImages
