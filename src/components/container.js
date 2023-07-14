import React from 'react'

const Container = ({ children, as = 'div' }) => {
  const Tag = as

  return (
    <Tag
      style={{
        // maxWidth: 'var(--size-max-width)',
        margin: '0 auto',
        padding: '0 var(--space-2xl)',
      }}
    >
      {children}
    </Tag>
  )
}

export default Container
