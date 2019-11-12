import * as React from 'react'
import Container from '../Container/Container'

const Footer: React.FC = ({ children }) => (
  <footer>
    <Container>
      {children}
    </Container>
  </footer>
)

export default Footer
