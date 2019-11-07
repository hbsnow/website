import React from 'react'
import Container from '../atoms/Container'

const Footer: React.FC = ({ children }) => {
  return (
    <>
      <footer>
        <Container>
          {children}
        </Container>
      </footer>
    </>
  )
}

export default Footer
