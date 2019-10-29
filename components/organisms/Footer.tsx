import React from 'react'
import Container from '../atoms/Container'

const Footer: React.FunctionComponent = ({ children }) => {
  return (
    <Container>
      <footer>{children}</footer>
    </Container>
  )
}

export default Footer
