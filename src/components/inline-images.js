import React from 'react'

import * as styles from './inline-images.module.css'

const InlineImages = ({ images }) => {
  if (!images?.length) {
    return null
  }

  return (
    <div
      className={
        styles.inlineImageContainer +
        ' ' +
        styles[`inlineImageContainerWith${images.length}`]
      }
    >
      {images.map((image, index) => {
        if (image?.file?.contentType?.includes('video')) {
          return (
            <div className={styles.inlineImage} key={index}>
              <video
                src={image?.file?.url}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                autoPlay={true}
                playsInline={true}
                controls={true}
                loop={true}
                muted={true}
              />
            </div>
          )
        } else if (image?.file?.contentType?.includes('image')) {
          return (
            <div className={styles.inlineImage} key={index}>
              <img
                alt=""
                src={image?.file?.url}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          )
        }
      })}
    </div>
  )
}

export default InlineImages
