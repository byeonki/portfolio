import React, { useMemo, useState } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import * as styles from './inline-images.module.css'

const InlineImages = ({ images }) => {
  if(!images?.length){
    return null
  }

  return (
    <div className={styles.inlineImageContainer}>
      {
        images.map((image)=>{
          console.log("iamge", image)
          return (
            <div className={styles.inlineImage} key={image.contentful_id}>
              <GatsbyImage
                imgStyle={{width:"100%", height:"100%"}}
                image={getImage(image.gatsbyImage)}
                alt={image.description}
              />
            </div>
          )
        }

        )
      }
    </div>
  )
}

export default InlineImages
