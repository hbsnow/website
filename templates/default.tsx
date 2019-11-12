import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <React.Fragment>
      <Header>header</Header>
      <main>{children}</main>
      <Footer>footer</Footer>
    </React.Fragment>
  )
}

export default Layout
