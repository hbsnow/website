import React from 'react'
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Header>header</Header>
      <main>{children}</main>
      <Footer>footer</Footer>
    </>
  )
}

export default Layout
