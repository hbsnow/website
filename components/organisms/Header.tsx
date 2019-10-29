import React from 'react'
import Container from '../atoms/Container'

const Header: React.FunctionComponent = ({ children }) => {
  return (
    <Container>
      <header>{children}</header>
    </Container>
  )
}

export default Header
