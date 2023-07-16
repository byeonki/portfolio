import React from 'react'

import * as styles from './inline-images.module.css'

const InlineImages = ({ images }) => {
  if(!images?.length){
    return null
  }

  return (
    <div className={styles.inlineImageContainer + " " + styles[`inlineImageContainerWith${images.length}`]}>
      {
        images.map((image, index)=>{
          const {file, description} = image.fields
          return (
            <div className={styles.inlineImage} key={index}>
              <img
                width={file.details.image.width}
                height={file.details.image.height}
                src={`https:${file.url}`}
                alt={description}
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default InlineImages
