import React, { useMemo, useState } from 'react'
import Container from './container'
import * as styles from './person.module.css'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import InlineImages from '../components/inline-images'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'

const Person = ({ person }) => {
	console.log("person", person)
	if(!person){
		return null
	}

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        const images = node?.data?.target?.images
        return images ? <InlineImages images={images} /> : null
      },
    },
  }

  return (
    <Container>
			<div className={styles.content}>
				<div className={styles.wrap}>
					{renderRichText(person.shortBio, options)}
				</div>
				<div className={styles.vLine}></div>
				<div className={styles.wrap}>
					<div className={styles.box}>
						{renderRichText(person.client, options)}
					</div>
					<div className={styles.box}>
						{renderRichText(person.exh, options)}
					</div>
				</div>
			</div>
    </Container>
  )
}

export default Person
