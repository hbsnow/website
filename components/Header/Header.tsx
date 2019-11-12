import * as React from 'react'
import Container from '../Container/Container'

const Header: React.FC = ({ children }) => (
  <header>
    <Container>
      <h1></h1>
      {children}
    </Container>
  </header>
)

export default Header
