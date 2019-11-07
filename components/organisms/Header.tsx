import React from 'react'
import Container from '../atoms/Container'

const Header: React.FC = ({ children }) => {
  return (
    <>
      <header className="header">
        <Container>
          {children}
        </Container>
      </header>

      <style jsx>{`
        max-width: 45rem;
        margin: 0 auto;
        padding: 0 1em;
      `}</style>
    </>
  )
}

export default Header
